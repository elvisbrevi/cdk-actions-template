"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { IRepository } from 'aws-cdk-lib/aws-ecr';
import { LambdaHelper } from '../helpers/lambda-helper';
import { ApiGwHelper } from '../helpers/apigw-helper';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { SqsHelper } from '../helpers/sqs-helper';

export class ExampleLambdaStack extends Stack {

  constructor(scope: Construct, id: string, repository: IRepository, props?: StackProps) {
    super(scope, id, props);
    
    const sqsHelper: SqsHelper = new SqsHelper(this);
    const queueDestination = sqsHelper.CreateQueue('example-sqs-destination');

    const lambdaHelper: LambdaHelper = new LambdaHelper(this);
    const lambda: IFunction = lambdaHelper.CreateFunctionFromEcr(
      repository, 'example-lambda', 'dev', queueDestination);
    const apigwt: ApiGwHelper = new ApiGwHelper(this);
    apigwt.CreateApiGwtForLambda('example-apigwt', lambda);

    const queueSource = sqsHelper.CreateQueue('example-sqs-source');
    lambdaHelper.AddEventSource(lambda, queueSource);

  }
}
