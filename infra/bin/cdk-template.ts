#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda-stack';
import { ECRStack } from '../lib/ecr-stack';

const app = new cdk.App();
const ecrStack: ECRStack = new ECRStack(app, 'editorjs-ecr');
const lambdaStack: LambdaStack = new LambdaStack(
    app, 'editorjs-function', '../../lambda/editorjs', 'prod', ecrStack.repository);

app.synth();