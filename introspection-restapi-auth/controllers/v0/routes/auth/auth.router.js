/*
 * Introspeciton App
 * Author: Justin Seymour
 *
 * Auth router for incoming requests
 */

// Dependencies
const express = require('express');


const def = require('../defaults/default');
const ping = require('../defaults/ping');
const login = require('../auth/login');
const logout = require('../auth/logout');

// Create the module to export
let _ = express.Router();

// Ping routes
_.get('/ping',ping.get);
_.all('/ping',def._405);

// Login routes
_.post('/login',login.post);
_.all('/login',def._405);

// Logout routes
_.get('/logout',logout.get);
_.all('/logout',def._405);

// 404 Handler
_.all('*',def._404);

// Export the module 
module.exports = _;