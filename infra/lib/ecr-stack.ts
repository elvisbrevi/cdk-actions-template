"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class ECRStack extends Stack {

  public repository : ecr.Repository;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.repository = this.CreateEcrRepository(this, id);
  }

  CreateEcrRepository(construct: Construct, name: string) : ecr.Repository {
    const repo = new ecr.Repository(construct, name, {
        repositoryName: name
    });

    return repo;
  }
}