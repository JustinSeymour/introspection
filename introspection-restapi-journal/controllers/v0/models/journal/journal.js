/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Models for the journal route
 */

// Dependencies
const base = require('./../dataAccess/mongo');
const { cloneDeep } = require('lodash');
const constraints = require('./../../../../lib/constraints');
const validate = require('validate.js');

// Create the module to export
let _ = class extends base {

   // Load an email address, or create a new email address with the default values
   constructor(id = false) {

      // Set the defaults
      console.log("From model  \n"+id);

      if(id) {
         super();
         // Set the specified _id
         let msg = validate.single(id, constraints.uuid());
         if(msg) {
            this.err = msg;
         } else {
            this._id = id;
            console.log("THis  \n"+this._id);
         };

      } else {
         super();
         this.userId;
         this.title = false;
         this.body = false;
         this.tags = [];
         this.introspection = {
            'successful': false,
            'challenge': false,
            'action': false
         }
         this.status = 'incomplete';
         this.category = false;
      }
      

   }

   async save() {
      super.save('journals');
   };

   async load() {
      await super.load('journals');
   }

   async update() {
      await super.update('journals');
   }

   async del(_id) {
      await super.del('journals', _id)
   }

   async getJournalsForUser(userId) {

      const searchObject = {userId: userId}
      const projection = { projection: { userId: 0} }; 
      const data = await super.loadItems('journals', searchObject, projection);
      
      if(!data) return false;
      
      return data; 
     
   }

   async setJournalData() {
      
      try {
        let journal = await this.loadItem('journals', {_id: this._id});
        
        for(let key in journal) {
         this[key] = journal[key];
        }
      
      } catch (err) {
         throw(new Error(err));
      }
   }

   async setPutData(data) {
      let msg;
      // Construct the query parameter
      if(!data) return msg = ["No data has been sent to update"];
      
      if(data.title) {
         this.title = data.title
      }

      if(data.body) {
         this.body = data.body
      }

      if(data.tags) {
         this.tags = data.tags
      }

      if(data.introspection) {
         this.introspection = introspection
      }

      if(data.status) {
         this.status = data.status
      }

      if(data.category) {
         this.category = category
      }

      return;

      // Construct the newValue object, sanitize
   }

   async setUserId(_id) {

      try {
         let msg;
         if(!_id) msg = ['UserId is required'];

         this.userId = _id;
         return msg;
      } catch(e) {
         throw(new Error(e));
      };
   };

   async setTitle(title) {

      try {
         let msg;
         if(!title) msg = ['Title field is required'];

         this.title = title;
         return msg;
      } catch(e) {
         throw(new Error(e));
      };
   };

   async setBody(body) {

      try {
         let msg;
         if(!body) msg = ['Body field is required'];

         this.body = body;
         return msg;
      } catch(e) {
         throw(new Error(e));
      };
   };

   async setTags(tags) {

      try {
         let msg;
         if(!tags) msg = ['Tags field is required'];

         this.tags = tags;
         return msg;
      } catch(e) {
         throw(new Error(e));
      };
   };

   async setIntrospection(introspection) {

      try {

         let msg;

         if(!introspection) msg = ['Tags field is required'];
        
         if(typeof(introspection === 'object')) {
            this.introspection.challenge = introspection.challenge;
            this.introspection.successful = introspection.successful;
            this.introspection.action = introspection.action;
         } else {
            msg = ['Malformed introspeciton object'];
         }

         return msg;

      } catch(e) {
         throw(new Error(e));
      };
   };

   async setStatus(status) {

      try {
         if(status) {
            this.status = status;
         }
         return;
      } catch(e) {
         throw(new Error(e));
      };
   };

   async setCategory(category) {

      try {
         let msg;
         if(!category) msg = ['Category field is required'];

         this.category = category;
         return msg;
      } catch(e) {
         throw(new Error(e));
      };
   };

   // Get the record filtered by the role of the requester
   async getRecordByRole(role) {

      try {

         // Do a deep clone of the record
         let record = cloneDeep(this);

         // Delete the properties based on the requesters role
         switch (role) {
            case 'owner':
               break
         }

         return record;

      } catch (err) {

         throw (new Error(err));

      }

   }




}

module.exports = _;