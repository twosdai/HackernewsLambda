# HackernewsLambda
A lambda deployed with serverless which emails yourself the job postings on hackernews


# How to run
  First you will need to configure AWS to do so create an AWS account and navigate to SES where you should have an email set.

   In Serverless.yml under the enviorment section for the hackernews function change the value of email address to be the verified email in SES.
   
  Finally running serverless deploy and then serverless invoke local --function hackernews will make your application work if you have exported AWS credentials
  
  TODO:
      Unit testing 
