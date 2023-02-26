"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { EcrHelper as EcrHelper } from '../helpers/ecr-helper';

export class ExampleEcrStack extends Stack {

  public repository : ecr.Repository;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const ecrHelper: EcrHelper = new EcrHelper(this);
    this.repository = ecrHelper.CreateEcrRepository(id);
  }
}