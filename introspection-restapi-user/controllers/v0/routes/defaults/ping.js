/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Handler for the Ping routes
 */

// Dependencies

// Create the module to export
let _ = {};

// Handle GET requests
_.get = async (req, res) => {

   const timestamp = Date.now()
   res.json({
      'ping':'successful',
      'service':'intropsection-restpi-user',
      'created':timestamp
   });
   
};

// Export the module
module.exports = _;