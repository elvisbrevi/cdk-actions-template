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

  constructor(
    scope: Construct, id: string, 
    saveUserEcr: IRepository, 
    saveOrderEcr: IRepository, 
    props?: StackProps) {

    super(scope, id, props);

    this.CreateSaveUserService(saveUserEcr);
    this.CreateSaveOrderService(saveOrderEcr);
  }

  CreateSaveUserService(repository: IRepository) {
    // dynamodb
    const dynamodbHelper: DynamoDbHelper = new DynamoDbHelper(this);
    dynamodbHelper.CreateTable('users');
    
    // queue destination
    const sqsHelper: SqsHelper = new SqsHelper(this);
    const queueDestination = sqsHelper.CreateQueue('example-queue-save-user');

    // lambda from ecr
    const lambdaHelper: LambdaHelper = new LambdaHelper(this);
    const lambda: IFunction = lambdaHelper.CreateFunctionFromEcr(
      repository, 'example-save-user', 'dev', queueDestination);

    // api gateway for lambda
    const apigwt: ApiGwHelper = new ApiGwHelper(this);
    apigwt.CreateApiGwtForLambda('example-apigwt-save-user', lambda);
  }

  CreateSaveOrderService(repository: IRepository) {
    // dynamodb
    const dynamodbHelper: DynamoDbHelper = new DynamoDbHelper(this);
    dynamodbHelper.CreateTable('orders');
    
    // queue destination
    const sqsHelper: SqsHelper = new SqsHelper(this);
    const queueSource = sqsHelper.CreateQueue('example-queue-order-user');

    // lambda from ecr
    const lambdaHelper: LambdaHelper = new LambdaHelper(this);
    const lambda: IFunction = lambdaHelper.CreateFunctionFromEcr(
      repository, 'example-order-user', 'dev');

    // add queue source to lambda
    lambdaHelper.AddEventSource(lambda, queueSource);

    // api gateway for lambda
    const apigwt: ApiGwHelper = new ApiGwHelper(this);
    apigwt.CreateApiGwtForLambda('example-apigwt-save-order', lambda);
  }

}
