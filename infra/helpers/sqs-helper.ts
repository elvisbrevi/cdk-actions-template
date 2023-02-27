"use-strict"
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { ServiceHelper } from './service-helper';
import { Duration } from 'aws-cdk-lib';

export class SqsHelper extends ServiceHelper  {

    public CreateQueue(
        name: string, 
        visibilityTimeout: number = 30, 
        receiveMessageWaitTime: number = 20) : sqs.Queue {
            
        return new sqs.Queue(this.construct, name, {
            queueName: name,
            visibilityTimeout: Duration.seconds(visibilityTimeout),
            receiveMessageWaitTime: Duration.seconds(receiveMessageWaitTime),
        });
    }
}