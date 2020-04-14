/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Models for the user route
 */

// Dependencies
const base = require('./../dataAccess/mongo');
const { cloneDeep } = require('lodash');
const constraints = require('./../../../../lib/constraints');
const validate = require('validate.js');
const zxcvbn = require('zxcvbn');
const bcrypt = require('bcryptjs');

// Create the module to export
let _ = class extends base {

   constructor() {

      // Set the defaults
      super();
      this.name = null;
      this.email = null;
      this.passwordHash = null;
      this.internal = {};
      this.banned = false;
      this.tags = [];

   }

   async save() {
      super.save('users');
   };

   async setName(name) {

      try {
         let msg;
         if(!name) msg = ['Name field is required'];

         this.name = name;
         return msg;
      } catch(e) {
         throw(new Error(e));
      };
   };

   async setEmail(email) {

      try {
         let msg;
         if(!email) msg = ['Email field is required'];

         this.email = email;
         return msg;
      } catch(e) {
         throw(new Error(e));
      };
   };

   // Set the password hash
   async setPasswordHash(password) {

      try {
      
         // Get the validation messages if any,
         let msg = validate.single(password, constraints.password());

         if(msg) return msg;

         // Get the password strength
         let passwordResult = zxcvbn(password);

         if(passwordResult.score <= 2){
            let feedback = passwordResult.feedback.warning;
            msg = feedback.length ? feedback : 'Password is not strong enough';
            return [msg];
         }

         // Hash the password
         let passwordHash = await bcrypt.hash(password, 10);
         this.passwordHash = passwordHash;

         return false;

      } catch(err) {
         throw(new Error(err));
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
               delete record.internal;
               delete record.banned;
               delete record.tags;
               delete record.passwordHash;
               break
         }

         return record;

      } catch (err) {
         throw (new Error(err));
      }

   }

}

module.exports = _;