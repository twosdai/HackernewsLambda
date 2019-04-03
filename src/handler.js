'use strict';
/**
 * Generally I adhere to self documenting code however I think for a while I will be the only one working on this so I am 
 * going to write comments to make it easier on myself to come back to work on it for the time being
 * 
 * Need to make sure the comments dont get out of date when I make changes
 */
const {firebaseQuery} = require('./firebaseQuery')
const AWS = require('aws-sdk')
const moment = require('moment')
module.exports.emailService =  async () => {
  
const ses = new AWS.SES();
//Get an array of job postinings
const arrayOfJobPostings = await firebaseQuery()
// Clean up the postings we only need certain info and the formatting for the email is specific
const cleanedJobpostings = arrayOfJobPostings.reduce((acc,item)=>{
  const {by,time,title,url} = item
const localTime = moment.unix(time).format('dddd, MMMM Do, YYYY h:mm:ss A')
  acc = `${acc}\n Title: ${title}\n Author: ${by}\n Time: ${localTime}\n Link: ${url}\n\n`
  return acc
},'')
const {emailAddress} = process.env
// These are the necessary parameters for interacting with SES
const eParams = {
  Destination: {
    //Email is set in Serverless.yml
      ToAddresses: [`${emailAddress}`]
  },
  Message: {
      Body: {
          Text: {
              Data: cleanedJobpostings
          }
      },
      Subject: {
          Data: "Todays job postings on hacker news"
      }
  },
  Source: `${emailAddress}`
};
// Console logging information for cloudformation
console.log('===SENDING EMAIL===');
try{
 await ses.sendEmail(eParams).promise();
console.log('sucessfully sent the email')
}
catch(error){
  console.log(error)
}

};
