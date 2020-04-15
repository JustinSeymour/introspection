// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: us-east-2});

// Create CloudWatchEvents service object
var cwevents = new AWS.CloudWatchEvents({apiVersion: '2015-10-07'});


let _ = class {

   constructor() {
      this.created = Date.now();
   }


   async sendEvent(detail, detailType, resources, source) {

      var params = {
         Entries: [
           {
             Detail: detail,
             DetailType: detailType,
             Resources: resources,
             Source: source
           }
         ]
       };


       cwevents.putEvents(params, function(err, data) {
         if (err) {
           console.log("Error", err);
         } else {
           console.log("Success", data.Entries);
         }
       });

       return;

   }
}

module.exports = _;