/* 
 * Introspection App
 * Author: Justin Seymour
 * 
 * General purpose utilities
 */

// Dependencies
const crypto = require('crypto');
const secretsLib = require('./secrets');

let _ = {};

// Get an object from JSON without throwing
_.getObjectFromJson = (str) => {
   try{
       let obj = JSON.parse(str);
       return obj;
   } catch (err) {
       return false;
   }
};

_.getTokenFromCookie = (cookie) => {

    try {
         var stringOne = cookie.split("=",2);
         var token = stringOne[1].split(";",1)
         return token;
    } catch(err) {
        return false;
    }

};

_.hashString = (str) =>{
    try {

        var hmac = crypto.createHmac("SHA256", secretsLib.secrets.jwt.secret).update(str).digest('base64');
        
        if(hmac) {
           return hmac;
        } else {
           return false;
        }
     } catch(err) {
        console.log("Error hasing string -> "+err);
        return false;
     };
};

_.hashObject = (obj) => {
    try {

        let securityObjectString = JSON.stringify(obj);
        var hmac = crypto.createHmac("SHA256", secretsLib.secrets.jwt.secret).update(securityObjectString).digest('base64');
        
        if(hmac) {
           return hmac;
        } else {
           return false;
        };

     } catch(err) {
         console.log("Error hashing string -> "+err);
        return false;
     };
};


module.exports = _;