"use-strict"
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

export class SsmHelper  {

    public static CreateStringParameter(construct: Construct, name: string, value: string) 
    : ssm.StringParameter {
        return new ssm.StringParameter(construct, name, {
            parameterName: name,
            stringValue: value,
            tier: ssm.ParameterTier.STANDARD,
        });
    }
}