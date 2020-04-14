/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Base class for mongo models
 */

 // Dependencies
 const mongo= require('./../../../../lib/mongo');
 const assert = require('assert');
 const uuidv4 = require('uuid/v4');
 const { cloneDeep } = require('lodash');

 // Create a module to export
let _ = class {

   // Set the fields that are common to all records in all connections
   constructor() {
      this.created = Date.now();
      this._id = uuidv4();
   };

   // Save the record to a specific collection
   async save(collection = false) {

      try {
         
         if(!collection) throw new Error('No collection name defined when attempting to save data');

         // Upsert the document and verified that it worked
         this.updated = Date.now();
         let cmd = await mongo.db.collection(collection).updateOne({_id : this._id}, {$set: this}, {upsert: true});
         assert.equal(1, cmd.modifiedCount + cmd.upsertedCount);

         return true

      } catch(err) {
         console.log("Error from mongo model: "+err);
         throw(new Error(err));
         
      };
   };

   // Load this record from the database
   async load(collection = false) {

      try {
         
         if(!collection) throw(new Error('No collection name defined when attempting to load data'));
         if(!this._id) return this.err = 'No _id defined when attempting to laod data';
         
         let item = cloneDeep(this);
         
         let result = await mongo.db.collection(collection).findOne({_id: this._id});
         console.log("Result from mongo  \n"+JSON.stringify(result));
         if(result) {
            for (let key in result){
               this[key] = result[key];
            }
         } else {
            this.err = ['Record with the specified _id could not be found'];
         }

         return true

      } catch(err) {
         throw(new Error(err));
      };

   };

   async loadItem(collection = false, searchObject = false) {

      try {

         if(!collection) throw(new Error('No collection name defined when attempting to load data'));
         if(!searchObject) return false;

         let result = await mongo.db.collection(collection).findOne(searchObject);
   
         if(!result) return false;

         return result;
         

      } catch(err) {
         throw(new Error(err));
      };

   }

   async loadItems(collection = false, searchParam = false, projection) {

      try {
         
         if(!collection) throw(new Error('No collection name defined when attempting to load data'));
         if(!searchParam) return false;
         
         let result = await mongo.db.collection(collection).find(searchParam, projection).toArray();

         if(result.length == 0) return false;

         return result;

      } catch(err) {
         throw(new Error(err));
      };

   }

   // Save the record to a specific collection
   async updateObject(collection = false, _id = false, data = false) {

      try {

         if(!collection) throw new Error('No collection name defined when attempting to update data');
         if(!_id) throw new Error('No _id defined when attempting to update data');
       
         // Upsert the document and verified that it worked
         this.updated = Date.now();
         let cmd = await mongo.db.collection(collection).updateOne({_id : _id}, {$set: {'security.nonce': data}}, {upsert: true});
      
         assert.equal(1, cmd.modifiedCount);

         return true

      } catch(err) {
         console.log("Error from mongo update object model: "+err);
         throw(new Error(err));
         
      };
   };


   // Save the record to a specific collection
   async updateItem(collection = false, query = false, data = false) {

      try {

         if(!collection) throw new Error('No collection name defined when attempting to update data');
         if(!query) throw new Error('No _id defined when attempting to update data');
       
         // Upsert the document and verified that it worked
         this.updated = Date.now();
         let cmd = await mongo.db.collection(collection).updateOne(query, {$set: data}, {upsert: false});
      
         assert.equal(1, cmd.modifiedCount);

         return true

      } catch(err) {
         console.log("Error from mongo update item model: "+err);
         throw(new Error(err));
         
      };
   };

   // Save the record to a specific collection
   async update(collection = false) {

      try {

         if(!collection) throw new Error('No collection name defined when attempting to update data');
       
         // Upsert the document and verified that it worked
         this.updated = Date.now();
         let cmd = await mongo.db.collection(collection).updateOne({_id: this._id}, {$set: this}, {upsert: false});
      
         assert.equal(1, cmd.modifiedCount);

         return true

      } catch(err) {
         console.log("Error from mongo update object model: "+err);
         throw(new Error(err));
         
      };
   };

   // Delete the record from a specific collection
   async del(collection = false, _id = false) {

      try {

         if(!collection) throw new Error('No collection name defined when attempting to delete data');
         if(!_id) throw new Error('No _id defined when attempting to delete data');

         let cmd = await mongo.db.collection(collection).deleteOne({_id: _id});
         assert.equal(1, cmd.deletedCount);

         return true

      } catch(err) {
         console.log("Error from mongo update object model: "+err);
         this.err = err
         throw(new Error(err));
         
      };
   };

   // Delete many records for a specific UID
   async deleteMany(collection = false, _id = false) {

      try {

         if(!collection) throw new Error('No collection name defined when attempting to delete data');
         if(!_id) throw new Error('No _id defined when attempting to delete data');

         
         let cmd = await mongo.db.collection(collection).deleteMany({_id: _id});
         assert.equal(1, cmd.deletedCount >= 1);

         return true

      } catch(err) {
         console.log("Error from mongo update object model: "+err);
         throw(new Error(err));
         
      };
   };

};



module.exports = _;