/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Handlers for the Email validation routes
 */

// Dependencies
const { get } = require('lodash');

// Create the module to export
let _ = {};

// Get requests
_.get = async (req,res) => {


   try {

      const timestamp = Date.now()
      res.json({ 
         'message': 'journal route successful get', 
         'service': 'intropsection-restpi-journal', 
         'created': timestamp 
      });

   } catch(err) {
      // Return a 500, log the error
      res.status(500).end();
   }


}

module.exports = _;