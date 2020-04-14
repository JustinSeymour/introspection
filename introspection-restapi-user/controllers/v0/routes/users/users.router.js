/*
 * Introspeciton App
 * Author: Justin Seymour
 *
 * User router for incoming requests
 */

// Dependencies
const express = require('express');

const def = require('../defaults/default');
const ping = require('../defaults/ping');
const users = require('../users/users');

// Create the module to export
let _ = express.Router();

// User routes
_.get('/',users.get);
_.all('/',def._405);

// Ping routes
_.get('/ping',ping.get);
_.all('/ping',def._405);

// 404 Handler
_.all('*',def._404);

// Export the module 
module.exports = _;