// import aws-sdk package
const AWS = require("aws-sdk");

// modify AWS config obj for DynamoDB connection to local instance
AWS.config.update({
    region: "us-east-2",
    endpoint: new AWS.Endpoint("http://localhost:8000")
  });

// create DynamoDB service obj
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// key-pair values = properties: schema configurations
// schema does not have to be predefined
const params = {
    TableName : "Thoughts",
    // queries automatically sort by createdAt and orders by most recent entry
    KeySchema: [       
      { AttributeName: "username", KeyType: "HASH"},  // Partition key
      { AttributeName: "createdAt", KeyType: "RANGE" }  // Sort key
    ],
    AttributeDefinitions: [       
        // String and Number, DynamoDB is NoSQL DB w/ lists (L) and maps (M)
      { AttributeName: "username", AttributeType: "S" },
      { AttributeName: "createdAt", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
      ReadCapacityUnits: 10, 
      WriteCapacityUnits: 10
    }
  };

dynamodb.createTable(params, (err,data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});