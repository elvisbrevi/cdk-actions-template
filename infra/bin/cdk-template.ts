#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ExampleLambdaStack } from '../lib/example-lambda-stack';
import { ExampleEcrStack } from '../lib/example-ecr-stack';

const app = new cdk.App();

const ecrStack = new ExampleEcrStack(app, 'example-ecr-stack');
new ExampleLambdaStack(app, 'example-lambda-stack', ecrStack.repository);

app.synth();