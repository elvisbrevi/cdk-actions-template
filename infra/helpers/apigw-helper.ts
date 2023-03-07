"use-strict"
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class ApiGwHelper  {

    // Defining the REST API service
    public static CreateRestApi(construct: Construct, id: string) : apigw.RestApi {
        
        return new apigw.RestApi(construct, id, {
            restApiName: id,
            description: 'Rest API from CDK'
        })
    }

    // Resources are the actual endpoints, excluding the base URL
    public static AddResourceToRestApi(
        construct: Construct, restApi: apigw.RestApi, path: string) : apigw.Resource { 
            return restApi.root.addResource(path);
    }

    // Add a Lambda integration
    public static AddLambdaIntegration(fn: IFunction) : apigw.LambdaIntegration {
        return new apigw.LambdaIntegration(fn);
    }

    public static AddMethod(httpMethod: string, resource: apigw.Resource, fnIntegration: apigw.LambdaIntegration) {
        // add this snippet below the existing code
        resource.addMethod(httpMethod, fnIntegration);
    }
}