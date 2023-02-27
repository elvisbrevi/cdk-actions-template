#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ExampleLambdaStack } from '../lib/example-lambda-stack';
import { ExampleEcrStack } from '../lib/example-ecr-stack';

const app = new cdk.App();

// create a ECR repository to store docker images.
const ecrStackSaveUser: ExampleEcrStack = new ExampleEcrStack(app, 'example-ecr-save-user');
// create a ECR repository to store docker images.
const ecrStackSaveOrder: ExampleEcrStack = new ExampleEcrStack(app, 'example-ecr-save-order');
// create a lambda function and store it in the ECR repository.
new ExampleLambdaStack(
    app, 'example-lambda-services', ecrStackSaveUser.repository, ecrStackSaveOrder.repository);
    
app.synth();