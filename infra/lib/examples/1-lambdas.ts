"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaHelper } from '../../helpers/lambda-helper';

export class LambdaExamplesStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {

    super(scope, id, props);

    // lambda from file
    LambdaHelper.CreateFunctionFromFile(
      this, '../examples/1-lambdas/hello-world','lambda-hello-world', 'dev');

    // lambda from Dockerfile
    LambdaHelper.CreateFunctionFromDockerFile(
      this, '../examples/1-lambdas/from-dockerfile','lambda-from-dockerfile', 'dev');
  }

}
