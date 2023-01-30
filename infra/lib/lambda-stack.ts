"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import path = require('path');

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, stageName: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaName: string = "test-name";
    this.CreateLambdaFunction(this, lambdaName, stageName);
  }

  CreateLambdaFunction(construct: Construct, name: string, stageName: string) {
    const dockerfile = path.join(__dirname, "../../lambda/example-1");
    const hello = new lambda.DockerImageFunction(construct, name, {
      code: lambda.DockerImageCode.fromImageAsset(dockerfile),
      functionName: name,
      environment: { stageName: stageName }
    });

    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello
    });
  }
}
