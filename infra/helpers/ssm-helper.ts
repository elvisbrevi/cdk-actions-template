"use-strict"
import * as ssm from 'aws-cdk-lib/aws-ssm';

import { ServiceHelper } from './service-helper';

export class SsmHelper extends ServiceHelper  {

    public CreateStringParameter(name: string, value: string) : ssm.StringParameter {
        return new ssm.StringParameter(this.construct, name, {
            parameterName: name,
            stringValue: value,
            tier: ssm.ParameterTier.STANDARD,
        });
    }
}