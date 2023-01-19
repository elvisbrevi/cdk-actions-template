"use-strict"
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class CdkTemplateStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      functionName: 'FunctionName',
      runtime: lambda.Runtime.NODEJS_14_X,    // execution environment
      code: lambda.Code.fromAsset('../lambda/example-1'),  // code loaded from "lambda" directory
      handler: 'index.handler'                // file is "hello", function is "handler"
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'Endpoint', {
      
      handler: hello
    });
    
  }
}
