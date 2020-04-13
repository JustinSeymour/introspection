/*
 * Introspeciton App
 * Author: Justin Seymour
 *
 * Main application router for incoming requests
 */

// Dependencies
const express = require('express');

const def = require('../controllers/v0/routes/default');
const ping = require('../controllers/v0/routes/ping');
const login = require('../controllers/v0/routes/login');

// Create the module to export
let _ = express.Router();

// Ping routes
_.get('/ping',ping.get);
_.all('/ping',def._405);

// Ping routes
_.get('/login',login.get);
_.all('/login',def._405);

// 404 Handler
_.all('*',def._404);

// Export the module 
module.exports = _;