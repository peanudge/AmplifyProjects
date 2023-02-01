/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	AUTH_ECOMERCEAPP32FFC85E_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");
const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

let userpoolId = process.env.AUTH_ECOMERCEAPP32FFC85E_USERPOOLID; // NOTE: automatically generated ENV CLI

// DynamoDB cconfiguration
const region = process.env.REGION;
// const ddb_table_name = "producttable";
const ddb_table_name = process.env.STORAGE_PRODUCTTABLE_NAME;
const docClient = new AWS.DynamoDB.DocumentClient({ region });

async function getGroupsForUser(event) {
  let userSub =
    event.requestContext.identity.cognitoAuthenticationProvider.split(
      ":CognitoSignIn:"
    )[1];

  let userParams = {
    UserPoolId: userpoolId,
    Filter: `sub = "${userSub}"`,
  };

  let userData = await cognito.listUsers(userParams).promise();
  const user = userData.Users[0];
  let groupParams = {
    UserPoolId: userpoolId,
    Username: user.Username,
  };

  const groupData = await cognito.adminListGroupsForUser(groupParams).promise();
  return groupData;
}

async function canPerformAction(event, group) {
  return new Promise(async (resolve, reject) => {
    if (!event.requestContext.identity.cognitoAuthenticationProvider) {
      return reject();
    }

    const groupData = await getGroupsForUser(event);
    const groupsForUser = groupData.Groups.map((group) => group.GroupName);
    if (groupsForUser.includes(group)) {
      resolve();
    } else {
      reject("user not in group, cannot perform action..");
    }
  });
}

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/products", async function (req, res) {
  try {
    const data = await getItems();
    res.json({ data });
  } catch (err) {
    res.json({ error: err });
  }
});

async function getItems() {
  const params = { TableName: ddb_table_name };
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

app.get("/products/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.post("/products", async function (req, res) {
  const { body } = req;
  const { event } = req.apiGateway;
  try {
    await canPerformAction(event, "Admin");
    const input = { ...body, id: uuid() };
    const params = { TableName: ddb_table_name, Item: input };
    await docClient.put(params).promise();
    res.json({ success: "item saved to database.." });
  } catch (err) {
    res.json({ error: err });
  }
});

app.post("/products/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/products", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/products/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/products", async function (req, res) {
  const { event } = req.apiGateway;
  try {
    await canPerformAction(event, "Admin");
    const params = {
      TableName: ddb_table_name,
      Key: { id: req.body.id },
    };
    await docClient.delete(params).promise();
    res.json({ success: "successfully deleted item" });
  } catch (err) {
    res.json({ error: err });
  }
});

app.delete("/products/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;