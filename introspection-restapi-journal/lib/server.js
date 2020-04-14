/*
 * Introspection App
 * Author: Justin Seymour
 *
 * HTTP server
 */

// Dependencies
const express = require('express');
const router = require('./router');
const app = express();
var cors = require('cors')
const cookieParser = require('cookie-parser')
const port = 8080;
const winston = require('winston');
const expressWinston = require('express-winston');


// Create module to export
let _ = {};

_.start = () => {

   try {

      app.listen(port);
      console.log("Core API listening on port: " + port);
      return true;

   } catch (err) {

      throw (new Error(err));

   }
};

app.use(cookieParser());

if (process.env.NODE_ENV === 'localhost') {
   app.use(cors());
};



//Set the logger
app.use(expressWinston.logger({
   'transports': [
      new winston.transports.Console()
   ]
}));

// Parse all requests as JSON
app.use(express.json());

// Set the router
app.use('/api/v0/', router);

module.exports = _;
