#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda-stack';
import { ECRStack } from '../lib/ecr-stack';

const app = new cdk.App();
const ecrStack = new ECRStack(app, 'ECRStack');
new LambdaStack(app, 'LambdaStack');
