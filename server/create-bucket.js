// load AWS SDK for Node.js
const AWS = require("aws-sdk");
// import uuid package to create unique s3 bucket name
const { v4: uuidv4 } = require("uuid");

// set region
AWS.config.update({region: "us-east-2"});

// create s3 service obj with designated API
const s3 = new AWS.S3({apiVersion: "2006-03-01"});

// create params for calling createBucket
// assigns metadata of bucket, such as bucket name
var bucketParams = {
    Bucket : "user-images-" + uuidv4(),
};

// call s3 to create s3 bucket using callback fx
s3.createBucket(bucketParams, (err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success");
    }
});