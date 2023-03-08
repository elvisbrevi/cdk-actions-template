#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ExampleLambdaStack } from '../lib/example-lambda-stack';
import { ExampleEcrStack } from '../lib/example-ecr-stack';

const app = new cdk.App();

const ecrStack = new ExampleEcrStack(app, 'example-ecr-stack');
new ExampleLambdaStack(app, 'example-lambda-stack', ecrStack.repository, { 
    env: { 
      account: process.env.CDK_DEFAULT_ACCOUNT, 
      region: process.env.CDK_DEFAULT_REGION 
  }});

app.synth();