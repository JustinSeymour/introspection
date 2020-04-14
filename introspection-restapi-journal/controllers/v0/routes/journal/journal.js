/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Handlers for the Email validation routes
 */

// Dependencies
const { get } = require('lodash');
const PayloadError = require('./../../models/errors/payload');
const RequestError = require('./../../models/errors/request');
const QueryError = require('./../../models/errors/query');
const Journal = require('./../../models/journal/journal');

// Create the module to export
let _ = {};

// Get requests
_.get = async (req,res) => {


   try {

      // Set the defaults
      let key = false;
      let msg = false;

      // Instantiate the user object
      key = '_id';

      if(!get(req.query,key)) return res.status(400).json(new QueryError(key,'no journal id sent with request'));

      let journal = new Journal(get(req.query, key));
      if(journal.err) return res.status(400).json(new PayloadError(key,journal.err));

      await journal.load();
      if(journal.err) return res.status(404).json(new RequestError(404));

      // Retrieve the data for it, filtered by what should be visible to the public
      let record = await journal.getRecordByRole('owner');

      // Return the filtered data
      res.json(record)

   } catch(err) {
      // Return a 500, log the error
      res.status(500).end();
   }


}

_.getAll = async (req, res) => {

   try {

      // Defaults for the validation process
      let msg = false;
      let key = false;

      // Instantiate the user object

      let journal = new Journal();

      key = 'userId';

      if(!get(req.query,key)) return res.status(400).json(new QueryError(key,'no user id sent with request'));

      let data = await journal.getJournalsForUser(get(req.query, key));
      if(!data) return res.status(404).json(new RequestError(404));

      // Retrieve the data for it, filtered by what should be visible to the public
      let record = data;

      // Return the filtered data
      res.json(record)


   } catch (err) {
      console.log(err);
      res.status(500).end();
   };

};

// Post requests
_.post = async (req,res) => {


   try {

      // Set the defaults
      let key = false;
      let msg = false;

      // Instantiate the user object
      let journal = new Journal();

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

_.put = async(req,res) => {

   try {

      let msg = false;
      let key = false;

      // Instantiate the property model
      key = '_id'
      let journal = new Journal(get(req.query, key));

      try {
         await journal.setJournalData();
      } catch(err) {
         return res.status(400).json(new QueryError(key, ["Failed to find journal with the _id given"]));
      }
      
      msg = await journal.setPutData(req.body);
      if(msg) return res.status(400).json(new QueryError(key, msg));

      await journal.update();

      // Retrieve the data for it, filtered by what should be visible to the public
      let record = await journal.getRecordByRole('owner');

      // Return the filtered data
      res.json(record)

   } catch (err) {
      console.log(err);
      res.status(500).end();
   };

}

_.delete = async (req, res) => {

   try {

      let msg = false;
      let key = false;

      // Instantiate the journal object and check the id is valid
      key = '_id'
      let journal = new Journal(get(req.query, key));
      if(journal.err) return res.status(400).json(new QueryError(key, journal.err));

      await journal.del(get(req.query, key));
      if(journal.err) return res.status(404).json(new RequestError(404));

      res.json({"messages":"successfully deleted journal"});

   } catch (err) {
      console.log("Error attemping to delete the journal, router: "+err);
      res.status(500).end();
   };

}

module.exports = _;