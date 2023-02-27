"use-strict"
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { ServiceHelper } from './service-helper';

export class DynamoDbHelper extends ServiceHelper  {

    public CreateTable(name: string) : dynamodb.Table {
        return new dynamodb.Table(this.construct, name, {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            tableName: name
        });
    }
}