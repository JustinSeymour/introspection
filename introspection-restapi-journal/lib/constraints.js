/*
 * Introspection
 * Author: Justin Seymour
 *
 * Constraints for the validation process
 */

// Dependencies
const helpers = require('./helpers');

// Create the modules to export 
let _ = {};

// password 
_.password = () => {

   // Create the constraints
   let constraints = {
      'presence': { 'allowEmpty': false},
      'type' : 'string',
      'length': {'minimum': 10}
   };

   return constraints;
};

// email 
_.email = () => {

   // Create the constraints
   let constraints = {
      'presence': { 'allowEmpty': false},
      'type' : 'string',
      'email': true
   };

   return constraints;
};

_.uuid = () => {

   // Set the regex
   let regex = "[\-\A-Za-z0-9]+";

   // Create the constraints
   let constraints = {
      'presence': { 'allowEmpty': false},
      'type' : 'string',
      'length': {
         'is': 36
      },
      'format' : {
         'pattern': regex,
         'flags' : 'i',
         'message': 'must match the follow pattern: '+regex
      }
   };

   return constraints;
};

module.exports = _;