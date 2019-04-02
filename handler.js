'use strict';
const {firebaseQuery} = require('./firebaseQuery')
const AWS = require('aws-sdk')
const moment = require('moment')
module.exports.hackernews =  async () => {
  
const ses = new AWS.SES();
const arrayOfJobPostings = await firebaseQuery()
const cleanedJobpostings = arrayOfJobPostings.reduce((acc,item)=>{
  const {by,time,title,url} = item
const localTime = moment.unix(time).format('dddd, MMMM Do, YYYY h:mm:ss A')
  acc = `${acc}\n Title: ${title}\n Author: ${by}\n Time: ${localTime}\n Link: ${url}\n\n`
  return acc
},'')


const eParams = {
  Destination: {
      ToAddresses: ["daniel.wasserlauf@gmail.com"]
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
  Source: "daniel.wasserlauf@gmail.com"
};

console.log('===SENDING EMAIL===');
try{
 await ses.sendEmail(eParams).promise();
console.log('sucessfully sent the email')
}
catch(error){
  console.log(error)
}

};
