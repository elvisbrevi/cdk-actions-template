#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ExampleHelloWorldLambdaStack } from '../lib/1-hello-world-lambda';

const exampleEnv = { 
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
}; 
const app = new cdk.App();

new ExampleHelloWorldLambdaStack(app, 'example-hello-world', { env: exampleEnv });

// const ecrStack = new ExampleEcrStack(app, 'example-ecr-stack');
// new ExampleLambdaStack(app, 'example-lambda-stack', ecrStack.repository, { 
//   env: { 
//     account: process.env.CDK_DEFAULT_ACCOUNT, 
//     region: process.env.CDK_DEFAULT_REGION 
// }});

app.synth();