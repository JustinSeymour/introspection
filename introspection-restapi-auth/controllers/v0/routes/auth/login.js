/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Handlers for the login routes
 */

// Dependencies
const { get } = require('lodash');
const PayloadError = require('./../../models/errors/payload');
const Login = require('./../../models/auth/login');

// Create the module to export
let _ = {};

// Get requests
_.get = async (req,res) => {

   try {

      const timestamp = Date.now()
      res.json({ 'message': 'Login route successful get', 'service': 'intropsection-restpi-auth', 'created': timestamp });

   } catch(err) {
      // Return a 500, log the error
      res.status(500).end();
   }

}

// Post requests
_.post = async (req,res) => {


   try {

      // Set the defaults
      let key = false;
      let msg = false;

      // Instantiate the user object
      let login = new Login();

      // Set email
      key = 'email';
      msg = await login.verifyEmail(get(req.body, key));
      if(msg) return res.status(401).json(new PayloadError(key,msg));

      // Set password
      key = 'password';
      msg = await login.verifyPassword(get(req.body, key));
      if(msg) return res.status(403).json(new PayloadError(key,msg));
   
      // Set JSON web token
      key = 'jwt';
      msg = await login.setToken();
      if(msg) return res.status(403).json(new PayloadError(key,msg));

      // Retrieve the data for it, filtered by what should be visible to the owner of the record
      let record = await login.getRecordByRole('owner');

      // Return the filtered data
      res.json(record); 

   } catch(err) {
      // Return a 500, log the error
      console.log("Error from login route:  \n"+err);
      res.status(500).end();
   }


}

module.exports = _;