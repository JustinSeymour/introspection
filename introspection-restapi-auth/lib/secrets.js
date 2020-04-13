/* 
 * Introspection App
 * Author: Justin Seymour
 * 
 * Load all secrets from AWS secrets manager
 */

 // Dependencies
const helpers = require('./helpers');
const AWS = require('aws-sdk');
const AWSregion = "us-east-2";

AWS.config.update({region: AWSregion});
var awsProfile = 'default';

if(process.env.NODE_ENV === 'localhost') {
    awsProfile = 'introspection-localhost';
    var credentials = new AWS.SharedIniFileCredentials({profile: awsProfile});
    AWS.config.credentials = credentials;
};

// Load all AWS resources
const opsworks = new AWS.OpsWorks();
const secretsManager = new AWS.SecretsManager();
const iam = new AWS.IAM();
 
// Create module to export
let _ = {};

// Secret data (to be filled in later)
_.secrets = {};


// Get the username (or service role name), and the type of user ("user" or "role")
_.getUserNameAndType = async () => {

    try {

        // Get the profile of the user making this request
        let thisUser = await opsworks.describeMyUserProfile().promise();
        let userName = thisUser.UserProfile.Name;
        
        // Record their name and role. 
        // If their name includes a slash(/) then their type is a service role ("role")
        let data = { 'name': userName, 'type': 'user' };
        if(userName.indexOf('/') > -1) {
            data.type = 'role';
            data.name = userName.split('/')[0];
        }
        
        return data;

    } catch(err) {
        throw(new Error(err));
    }
};

// Get the value of the deployment tag associated with the user or service role
_.getDeploymentTag = async (name, type) => {

    try {

        // Set the params for the request
        let params = {
            'UserName': name
        };
        let fuctionToCall = 'listUserTags';

        // Switch the params if the user is a service role
        if(type == 'role') {
            params = {
                'RoleName': name
            };
            fuctionToCall = 'listRoleTags';
        };

        // Make the request
        let data = await iam[fuctionToCall](params).promise();

        // Look for the value of the 'deployment key in the response
        let deploymentTagValue = false;
        for (let tag of data.Tags) {
            if (tag.Key == 'deployment') {
                deploymentTagValue = tag.Value;
            }
        }
        
        // Return or throw
        if (deploymentTagValue) return deploymentTagValue.trim().toLowerCase();
        throw(new Error(err));
    } catch (err) {
        throw(new Error(err));
    }

};

// Get the secret data recursively 
_.getSecretsRecursively = async (arr =[], next =false) => {

    let params = {};
    if(next) params.NextToken = next;
    let data = await secretsManager.listSecrets(params).promise();
    let newArr = arr.concat(data.SecretList);
    if(data.NextToken) {
        newArr = await _.getSecretsRecursively(newArr, data.NextToken)
    };
    return newArr;

};

// Get the names of all the secrets whose deployment tag matched a certain value
_.getAllSecretsByTag = async (tag) => {
    
    try {

        // Define an array that we will use to fill with the names of the secrets
        let secretNames = [];

        let arr = await _.getSecretsRecursively();
        
        // Check which secrets have a deployment tag matching the value we're looking for
        for (let secret of arr) {
            if (typeof(secret.Tags) === 'object' && secret.Tags instanceof Array && secret.Tags.length > 0) {
                for (let secretTag of secret.Tags) {
                    
                    if (secretTag.Key === 'deployment' && secretTag.Value === tag && secretNames.indexOf(secret.Name) == -1) {
                        secretNames.push(secret.Name);
                    }
                }
            }
        }

        
        // Return or throw
        if(secretNames.length) return secretNames;
        throw(new Error('Could not retrieve any secrets from get secrets by tag function'));

    } catch(err) {
        throw(new Error(err));
    }
};

_.getSecretData = async (secrets) => {

    try {
        // Define the object that will hold the secrets
        let secretData = {};

        // Count the secrets that are retrieved
        let secretsRetrieved = 0;

        // For each secret in the list, try and retrieve its value
        for (let secret of secrets) {

            let params = {
                SecretId: secret
            }

            let data = await secretsManager.getSecretValue(params).promise();
            let parsedSecret = helpers.getObjectFromJson(data.SecretString);
            if (parsedSecret && secret.indexOf('/') > -1) {
                secretData[secret.split('/').slice(-1)[0]] = parsedSecret;
                secretsRetrieved ++;
            }
        }

        // Return or throw
        _.secrets = secretData;
        if(secretsRetrieved) return secretData;
        throw(new Error('Could not retrieve any secrets')); 
    } catch (err) {
        throw(new Error(err));
    }
};

 // Load all steps
 _.load = async () => {

    try {

        // Get the user data
        let userData = await _.getUserNameAndType();
        
        // Get the user's deployment tag
        let userTag = await _.getDeploymentTag(userData.name, userData.type);
        
        // Get all the secrets for that tag
        let secrets = await _.getAllSecretsByTag(userTag);
        
        // Get the value of each secret
        let secretData = await _.getSecretData(secrets);
        
        return secretData

    } catch (err) {
        throw(new Error(err));
    }
 };

 module.exports = _;