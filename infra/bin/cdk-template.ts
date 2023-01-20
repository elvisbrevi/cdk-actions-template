#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda-stack';
import { ECRStack } from '../lib/ecr-stack';

const envECR = { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION,
    REPO_NAME: 'lambda-ecr-repo' 
};
const app = new cdk.App();
new ECRStack(app, 'ECRStack', { env: envECR } );
new LambdaStack(app, 'LambdaStack');
