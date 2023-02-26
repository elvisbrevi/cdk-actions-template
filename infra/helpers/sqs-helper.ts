"use-strict"
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { ServiceHelper } from './service-helper';

export class SqsHelper extends ServiceHelper  {

    public CreateQueue(name: string) : sqs.Queue {
        return new sqs.Queue(this.construct, name);
    }
}