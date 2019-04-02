# HackernewsLambda
A lambda deployed with serverless which emails yourself the job postings on hackernews


# How to run
  First you will need to configure AWS to do so create an AWS account and navigate to SMS where you should have an email set.
  Currently you will need to alter handler.js under the source and toAddresses to be the emails you want soon these will be passed as arguments
  Finally running serverless deploy and then serverless invoke local --function hackernews will make your application work if you have exported AWS credentials
  
  TODO:
      Add option for lambda to run daily in AWS
      Unit testing 
      CI work
      Update readme
