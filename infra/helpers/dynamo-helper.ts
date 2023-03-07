"use-strict"
import * as cdk_dynamodb from 'aws-cdk-lib/aws-dynamodb';
import  * as sdk_dynamodb from '@aws-sdk/client-dynamodb';
import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { Construct } from 'constructs';

export class DynamoDbHelper  {

    public static async CreateTable(construct: Construct, name: string) : Promise<cdk_dynamodb.Table> {

        const tableExists = await this.checkIfDynamoDbExists('applicationName');
        if (!tableExists) {
            return new cdk_dynamodb.Table(construct, name, {
                partitionKey: { name: 'id', type: cdk_dynamodb.AttributeType.STRING },
                tableName: name,
            });
        } else {
            return cdk_dynamodb.Table.fromTableName(
                construct, name, name) as cdk_dynamodb.Table;
        }
    }

    public static async checkIfDynamoDbExists(name: string ) {
        const client = new sdk_dynamodb.DynamoDBClient({});
        const command = new ListTablesCommand({});
        try {
            const results = await client.send(command);
            return results!.TableNames!.indexOf(name) > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}