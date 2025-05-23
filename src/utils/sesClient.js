const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION ,credentials:{accessKeyId:process.env.ACCESS_KEY,secretAccessKey:process.env.SECRET_ACCESS_KEY}});
module.exports= { sesClient };