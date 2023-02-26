"use-strict"
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { ServiceHelper } from './service-helper';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

export class ApiGwHelper extends ServiceHelper  {

    public CreateApiGwtForLambda(id: string, fn: IFunction): apigw.LambdaRestApi { 
        return new apigw.LambdaRestApi(this.construct, id, {
            handler: fn,
        });
    }
}