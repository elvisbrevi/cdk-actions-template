"use-strict"
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineAppsStage } from './stage';

export class CodePipelineStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
 
        const pipeline = new CodePipeline(this, 'MyPipeline', {
            pipelineName: 'TestPipeline',
            synth: new ShellStep('TestSynth', {
                input: CodePipelineSource.gitHub('elvisbrevi/cdk-template', 'master', {
                    authentication: cdk.SecretValue.secretsManager("github-token2")
                }),
                commands: ['npm ci',
                        'npm run build',
                        'npm cdk synth']
            })
        });

        const testingStage = pipeline.addStage(new PipelineAppsStage(this, 'develop'));

        testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

        const prodStage = pipeline.addStage(new PipelineAppsStage(this, 'prod'));
       
    }

}