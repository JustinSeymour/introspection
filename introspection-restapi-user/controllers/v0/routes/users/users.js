/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Handlers for the Email validation routes
 */

// Dependencies
const { get } = require('lodash');
const PayloadError = require('./../../models/errors/payload');
const User = require('./../../models/users/users');

// Create the module to export
let _ = {};

// Get requests
_.get = async (req,res) => {


   try {

      const timestamp = Date.now()
      res.json({ 
         'message': 'user route successful get', 
         'service': 'intropsection-restpi-user', 
         'created': timestamp 
      });

   } catch(err) {
      // Return a 500, log the error
      res.status(500).end();
   }


}

// Post requests (register a user)
_.post = async (req,res) => {


   try {

      // Set the defaults
      let key = false;
      let msg = false;

      // Instantiate the user object
      let user = new User();

      // Set name
      key = 'name';
      msg = await user.setName(get(req.body, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Set email
      key = 'email';
      msg = await user.setEmail(get(req.body, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Set password
      key = 'password';
      msg = await user.setPasswordHash(get(req.body, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Save the object
      await user.save()

      // Retrieve the data for it, filtered by what should be visible to the owner of the record
      let record = await user.getRecordByRole('owner');

      // Return the filtered data
      res.json(record);
      

   } catch(err) {
      // Return a 500, log the error
      res.status(500).end();
   }


}


module.exports = _;