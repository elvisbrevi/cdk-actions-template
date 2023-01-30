#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda-stack';
import { ECRStack } from '../lib/ecr-stack';
import { CodePipelineStack } from '../lib/codepipeline-stack';

const app = new cdk.App();
new CodePipelineStack(app, 'MyPipelineStack');
//const ecrStack = new ECRStack(app, 'ECRStack');
//new LambdaStack(app, 'LambdaStack', 'test');

app.synth();