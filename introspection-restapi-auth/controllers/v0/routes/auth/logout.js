/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Handlers for the logout routes
 */

// Dependencies
const { get } = require('lodash');

// Create the module to export
let _ = {};

// Get requests
_.get = async (req, res) => {


   try {

      const timestamp = Date.now()

      return res.status(202).json({
         'Message': 'Successfully reached logout',
         'Service': 'introspection-restapi-auth',
         'Created': timestamp
      });

   } catch (err) {
      // Return a 500, log the error
      res.status(500).end();
   }


}

// Export the module
module.exports = _;