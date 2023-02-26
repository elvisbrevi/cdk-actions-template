"use-strict"
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { ServiceHelper } from './service-helper';

export class EcrHelper extends ServiceHelper {
     
    public CreateEcrRepository(name: string) : ecr.Repository {
        return new ecr.Repository(this.construct, name, {
            repositoryName: name
        });
    }
}