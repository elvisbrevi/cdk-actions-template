"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaHelper } from '../helpers/lambda-helper';

export class ExampleHelloWorldLambdaStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {

    super(scope, id, props);

    // lambda from file
    LambdaHelper.CreateFunctionFromFile(
      this, '../examples/1-hello-world-lambda','example-hello-world', 'dev');
  }

}
