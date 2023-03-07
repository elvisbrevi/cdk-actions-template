"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { EcrHelper } from '../helpers/ecr-helper';

export class ExampleEcrStack extends Stack {

  public repository : ecr.Repository;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.repository = EcrHelper.CreateEcrRepository(this, id);
  }
}