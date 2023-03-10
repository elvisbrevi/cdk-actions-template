#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaExamplesStack } from '../lib/examples/1-lambdas';

const exampleEnv = { 
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
}; 
const app = new cdk.App();

new LambdaExamplesStack(app, 'lambda-examples', { env: exampleEnv });

// const ecrStack = new ExampleEcrStack(app, 'example-ecr-stack');
// new ExampleLambdaStack(app, 'example-lambda-stack', ecrStack.repository, { 
//   env: { 
//     account: process.env.CDK_DEFAULT_ACCOUNT, 
//     region: process.env.CDK_DEFAULT_REGION 
// }});

app.synth();