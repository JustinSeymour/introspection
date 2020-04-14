/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Handler for the default routes, usable on the router in place of actual routes
 */

// Dependencies

// Create the module to export
let _ = {};

// Method not allowed
_._405 = async (req, res) => {
   let code = 405;
   return res.status(code).json({'Error':'Method not allowed'});
};

// Not found
_._404 = async (req, res) => {

   let code = 404;
   let timestamp = Date.now()
   return res.status(code).json({
      'error':'resource not found',
      'service':'introspection-restapi-user',
      'created':timestamp,
      'request headers':req.headers,
      'full Request': req
   });

};

// Export the module
module.exports = _;