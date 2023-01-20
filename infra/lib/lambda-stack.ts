"use-strict"
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import path = require('path');
import { Construct } from 'constructs';

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaName: string = "test-name";
    this.CreateLambdaFunction(this, lambdaName);
  }

  CreateLambdaFunction(construct: Construct, name: string) {
    const dockerfile = path.join(__dirname, "../../lambda/example-1");
    const hello = new lambda.DockerImageFunction(this, name, {
      code: lambda.DockerImageCode.fromImageAsset(dockerfile),
      functionName: name
    });

    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello
    });
  }
}
