"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import path = require('path');
import { IRepository } from 'aws-cdk-lib/aws-ecr';

export class LambdaStack extends Stack {

  private repository : IRepository;
  private lambdaFunction: lambda.DockerImageFunction;

  constructor(scope: Construct, id: string, stageName: string, directory: string, repository: IRepository, 
    props?: StackProps) {

    super(scope, id, props);

    this.repository = repository;
    this.lambdaFunction = this.CreateLambdaFunction(this, id, directory, stageName, repository);

    new apigw.LambdaRestApi(this, id + '_api', {
      handler: this.lambdaFunction,
    });
  }

  CreateLambdaFunction(construct: Construct, name: string, directory:string, stageName: string,
    repository: IRepository) {
    //const dockerfile = path.join(__dirname, directory);

    // create lambda function from ECR image
    const lambdaFunction = new lambda.DockerImageFunction(construct, name, {
      code: lambda.DockerImageCode.fromEcr(repository),
      functionName: name,
      environment: { stageName: stageName }
    });

    return lambdaFunction;
  }
}
