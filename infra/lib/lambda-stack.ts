"use-strict"
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import path = require('path');

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dockerfile = path.join(__dirname, "../../lambda/example-1");
    // Create AWS Lambda function and push image to ECR
    const hello = new lambda.DockerImageFunction(this, "function", {
      code: lambda.DockerImageCode.fromImageAsset(dockerfile),
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'Endpoint', {
      
      handler: hello
    });
  }
}
