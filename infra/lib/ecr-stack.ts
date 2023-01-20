"use-strict"
import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export class ECRStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repoName: string = process.env.REPO_NAME ? process.env.REPO_NAME : "repoName";
    this.CreateEcrRepository(this, repoName);
  }

  CreateEcrRepository(construct: Construct, name: string) : ecr.Repository {
    const repo = new ecr.Repository(construct, name, {
        repositoryName: process.env.REPO_NAME
    });

    return repo;
  }
}