"use-strict"
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
import { App, Stack, StackProps } from 'aws-cdk-lib';

export class ECRStack extends Stack {

  public repository : ecr.Repository;

  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const repoName: string = "test-name";
    this.repository = this.CreateEcrRepository(this, repoName);
  }

  CreateEcrRepository(construct: Construct, name: string) : ecr.Repository {
    const repo = new ecr.Repository(construct, name, {
        repositoryName: name
    });

    return repo;
  }
}