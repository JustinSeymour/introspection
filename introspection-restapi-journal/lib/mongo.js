/*
 * Introspection
 * Author: Justin Seymour
 *
 * Connect MongoDB
 */

// Dependencies
const MongoClient = require('mongodb').MongoClient;
const secretsLib = require('./secrets');

// Create the module to export 
let _ = {};

// Load the mongoDB
_.start = async () => {

   try {
      
      // Get the current state of the secrets
      let secrets = secretsLib.secrets;

      // Get the mongo settings from secrets
      _.settings = secrets.mongo;

      // Connection string
      _.connectionUri = `${_.settings.protocol}${_.settings.username}:${_.settings.password}@${_.settings.url}`;

      // Create a client 
      _.client = new MongoClient(_.connectionUri, { useNewUrlParser: true});
      await _.client.connect();

      // Create a specific connection to a db
      _.db = await _.client.db(_.settings.database);

      // Log and return
      console.log('MongoDB connection established');
      return true;


   } catch(err) {
      throw(new Error(err));
   };

};

// Export the module
module.exports = _;