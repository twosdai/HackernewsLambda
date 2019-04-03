# HackernewsLambda
A lambda deployed with serverless to email yourself daily with the job postings on hackernews


# How to run
  First you will need to configure AWS to do so create an AWS account and navigate to SES, from here follow a guild to setting up a verified email with SES: https://docs.aws.amazon.com/ses/latest/DeveloperGuide/setting-up-email.html

   In Serverless.yml under the enviorment section for the hackernews function change the value of email address to be the verified email in SES.

  Finally running serverless deploy and then serverless invoke local --function hackernews will make your application work if you have exported AWS credentials to add you AWS credentials to your command line follow the AWS docs again: 
  https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
  
  TODO:
      Unit testing 
