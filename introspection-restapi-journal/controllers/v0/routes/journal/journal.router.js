/*
 * Introspeciton App
 * Author: Justin Seymour
 *
 * Journal router for incoming requests
 */

// Dependencies
const express = require('express');

const def = require('../defaults/default');
const ping = require('../defaults/ping');
const journal = require('../journal/journal');
const jwt = require('jsonwebtoken');
const secretsLib = require('./../../../../lib/secrets');

// Create the module to export
let _ = express.Router();

async function requireAuth(req, res, next) {
   //   return next();
       if (!req.headers || !req.headers.authorization){
           return res.status(401).send({ message: 'No authorization headers.' });
       }
       
   
       const token_bearer = req.headers.authorization.split(' ');
       if(token_bearer.length != 2){
           return res.status(401).send({ message: 'Malformed token.' });
       }

       let jwtSecret = secretsLib.secrets.jwt.secret;
       
       const token = token_bearer[1];
       return jwt.verify(token, jwtSecret , (err, decoded) => {
         if (err) {
           return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
         }
         return next();
       });
   }

// Journal routes
_.put('/', requireAuth,journal.put);
_.post('/', requireAuth, journal.post);
_.get('/', requireAuth, journal.get);

_.delete('/', requireAuth,journal.delete);
_.get('/user', requireAuth, journal.getAll);


// Ping routes
_.get('/ping', requireAuth, ping.get);
_.all('/ping', requireAuth, def._405);


// 404 Handler
_.all('*',def._404);

// Export the module 
module.exports = _;