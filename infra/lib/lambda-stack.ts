"use-strict"
import { Construct } from 'constructs';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import path = require('path');

export class LambdaStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
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
