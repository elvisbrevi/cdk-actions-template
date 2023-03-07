"use-strict"
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export class EcrHelper {
     
    public static CreateEcrRepository(construct: Construct, name: string) : ecr.Repository {
        return new ecr.Repository(construct, name, {
            repositoryName: name
        });
    }
}