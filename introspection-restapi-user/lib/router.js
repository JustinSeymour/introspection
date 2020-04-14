/*
* Main application auth router for incoming requests
* 
* Function is to forward any requests that come on the
* api/v0/user route to the appropriate handler
* 
*/

// Dependencies
const express = require('express');
const journalRouter = require('../controllers/v0/routes/user/user.router');
const def = require('../controllers/v0/routes/defaults/default');

// Create the module to export
let _ = express.Router();

// Any route with /api/v0/auth will pipe requests to authRouter middleware
_.use('/users', journalRouter )

// 404 Handler for any unhandled requests at this level
_.all('*',def._404);

// Export the module 
module.exports = _;