/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Query errors
 */

// Dependencies
const base = require('./base');

// Create the module to export
let _ = class extends base {

   //Create the error object
   constructor(key = null, msg = null) {

      // Set the error type
      super('query');

      // Set the values
      this.error.messages = msg;
      this.error.key = key;

   }

};

module.exports = _;