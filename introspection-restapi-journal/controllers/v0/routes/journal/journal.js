/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Handlers for the Email validation routes
 */

// Dependencies
const { get } = require('lodash');
const PayloadError  = require('./../../../../../introspection-restapi-user/controllers/v0/models/errors/payload');
const Journal = require('./../../models/journal/journal');

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

// Post requests
_.post = async (req,res) => {


   try {

      // Set the defaults
      let key = false;
      let msg = false;

      // Instantiate the user object
      let journal = new Journal();
      if(journal.err) return res.status(400).json(new PayloadError(key,msg));

      // Set the user Id
      key = '_id';
      msg = await journal.setUserId(get(req.query, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Set title
      key = 'title';
      msg = await journal.setTitle(get(req.body, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Set body
      key = 'body';
      msg = await journal.setBody(get(req.body, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Set body
      key = 'body';
      msg = await journal.setBody(get(req.body, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Set tags
      key = 'tags';
      msg = await journal.setTags(get(req.body, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Set introspection
      key = 'introspection';
      msg = await journal.setIntrospection(get(req.body, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Set introspection
      key = 'introspection';
      msg = await journal.setIntrospection(get(req.body, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Set status
      key = 'status';
      msg = await journal.setStatus(get(req.body, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Set category
      key = 'category';
      msg = await journal.setCategory(get(req.body, key));
      if(msg) return res.status(400).json(new PayloadError(key,msg));

      // Save the object
      await journal.save()

      // Retrieve the data for it, filtered by what should be visible to the owner of the record
      let record = await journal.getRecordByRole('owner');

      // Return the filtered data
      res.json(record);


   } catch(err) {
      // Return a 500, log the error
      console.log("Error from journal route  \n"+err);
      res.status(500).end();
   }


}

module.exports = _;