#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ExampleLambdaStack } from '../lib/example-lambda-stack';
import { ExampleEcrStack } from '../lib/example-ecr-stack';

const app = new cdk.App();

// create a ECR repository to store docker images.
const ecrStack: ExampleEcrStack = new ExampleEcrStack(app, 'example-ecr');
// create a lambda function and store it in the ECR repository.
const lambdaStack: ExampleLambdaStack = new ExampleLambdaStack(
    app, 'example-lamda-from-ecr', ecrStack.repository);
    
app.synth();