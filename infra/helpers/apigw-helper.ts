"use-strict"
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class ApiGwHelper  {

    public static CreateApiGwtForLambda(construct: Construct, id: string, fn: IFunction)
    : apigw.LambdaRestApi { 
        return new apigw.LambdaRestApi(construct, id, {
            handler: fn,
        });
    }
}