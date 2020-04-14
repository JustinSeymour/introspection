/*
 * C3 Maintenance Solutions Botswana Pty Ltd
 * Author: Justin Seymour
 *
 * Models for the _
 */

// Dependencies
const base = require('./../../models/dataAccess/mongo');
const { cloneDeep } = require('lodash');
const constraints = require('./../../../../../introspection-restapi-user/lib/constraints');
const validate = require('validate.js');
const secretsLib = require('./../../../../lib/secrets');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create the module to export
let _ = class extends base {

   // Load an email address, or create a new email address with the default values
   constructor() {

      // Set the defaults
      super();
      this.email = false;
      this.passwordHash = false;
      this.name = false;
   }

   async verifyEmail(email) {

      try {
      
         // Get validation messages if any
         let msg = validate.single(email, constraints.email());

         if(msg) return msg;

         // Send the email to the database and check that it exists
         let searchObject = {email: email}
         let userData = await this.loadItem('users', searchObject);
         
         if (!userData) {
            return ['Email address doesnt exist'];
         } else {
            this.email = userData.email;
            this.passwordHash = userData.passwordHash;
            this.userId = userData._id;
            this.name = userData.name;
         };

         return;

      } catch(err) {
         throw(new Error(err));
      };

   };

   async verifyPassword(password) {

      try {

         // Get the validation messages if any,
         let msg = validate.single(password, constraints.password());

         if(msg) return msg;

         const result = await new Promise((resolve, reject) => {
            bcrypt.compare(password, this.passwordHash, (error, res) => {
               if(error) reject(err);
               resolve(res);
            });
         });
         
         if(!result) return msg = ['Password is incorrect'];

         return;

      } catch (err) {
         throw (new Error(err));
      };
   };

   async setToken() {

      try {
         
         let jwtSecret = secretsLib.secrets.jwt.secret;

         
         let payload = {
            email: this.email,
            name: this.name,
            userId: this.userId
         };
         let token = jwt.sign(payload,
            jwtSecret, {
               expiresIn: '1d'
            }
         );

         let msg;
         
         if(token) {
            this.jwt = token;
         } else {
            msg = ['Failed to create the JWT token'];
         };

         return msg;

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
               delete record.passwordHash;
               delete record.email;
               delete record.name;
               break
         }

         return record;

      } catch (err) {

         throw (new Error(err));

      }
   }
}

module.exports = _;