"use-strict"
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { IRepository } from 'aws-cdk-lib/aws-ecr';
import { ServiceHelper } from './service-helper';

export class LambdaHelper extends ServiceHelper {
    
    public CreateFunctionFromEcr(repository: IRepository, name: string, stageName: string) {
        return new lambda.DockerImageFunction(this.construct, name, {
            code: lambda.DockerImageCode.fromEcr(repository),
            functionName: name,
            environment: { stageName: stageName }
        });
    }
}
