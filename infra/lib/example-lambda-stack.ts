"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { IRepository } from 'aws-cdk-lib/aws-ecr';
import { LambdaHelper } from '../helpers/lambda-helper';
import { ApiGwHelper } from '../helpers/apigw-helper';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { SqsHelper } from '../helpers/sqs-helper';
import { DynamoDbHelper } from '../helpers/dynamo-helper';

export class ExampleLambdaStack extends Stack {

  constructor(scope: Construct, id: string, repo: IRepository, props?: StackProps) {

    super(scope, id, props);

    // dynamodb
    //const dynamodbHelper: DynamoDbHelper = new DynamoDbHelper(this);
    //dynamodbHelper.CreateTable('users');
    
    // queue source
    //const sqsHelper: SqsHelper = new SqsHelper(this);
    //const queueSource = sqsHelper.CreateQueue('example-queue-save-user');

    // lambda from ecr
    const lambda: IFunction = LambdaHelper.CreateFunctionFromEcr(
      this, repo, 'example-save-user', 'dev');

    // add event source to lambda from queue source (sqs)
    //lambdaHelper.AddEventSource(lambda, queueSource);

    // api gateway for lambda
    // const apigwt: ApiGwHelper = new ApiGwHelper(this);
    // apigwt.CreateApiGwtForLambda('example-apigwt-save-user', lambda);
  }

}
