/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Request errors
 */

// Dependencies
const base = require('./base');

// Create the module to export
let _ = class extends base {

   // Create the error object
   constructor(code = null) {

      // Set the error type
      super('request');

      // Set the values 
      this.error.code = code;

   }

};

module.exports = _;