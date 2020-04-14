/*
 * Introspection App
 * Author: Justin Seymour
 *
 * Primary entry point for the application
 */

// Dependencies
const secrets = require('./lib/secrets');
const server = require('./lib/server');
const mongo = require('./lib/mongo');

// Create module to export
let _  = {};

// Start the application
_.run = async () => {
    try {

        let secretData = await secrets.load();
        await mongo.start();
        await server.start();

        return true;
        
    } catch (err) {
        console.log(err);
    }
};

// Start itself (run)
_.run();

// Export the module (Mainly for testing use).
module.exports = _;