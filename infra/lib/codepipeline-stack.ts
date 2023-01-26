"use-strict"
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { GitHubSourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Artifact, Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { PipelineProject } from 'aws-cdk-lib/aws-codebuild';

export class CodePipelineStack extends Stack {

    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new Pipeline(this, 'MyPipeline', {
            pipelineName: 'MyGitHubPipeline'
        });

        const sourceAction = new GitHubSourceAction({
            actionName: 'GitHub_Source',
            owner: 'elvisbrevi',
            repo: 'cdk-template',
            oauthToken: cdk.SecretValue.secretsManager('github-oauth-token'),
            output: new Artifact(),
            branch: 'main',
        });

        pipeline.addStage({
            stageName: 'Source',
            actions: [sourceAction],
        });


        const project = new PipelineProject(this, 'MyBuildProject', {
            buildSpec: cdk.aws_codebuild.BuildSpec.fromObject({
                version: '0.2',
                phases: {
                    build: {
                        commands: [
                            'echo "Build started on `date`"'
                        ]
                    },
                },
            }),
        });
        const buildStage = new cdk.Stage(this, 'Build');
        const buildAction = new cdk.aws_codepipeline_actions.CodeBuildAction({
            actionName: 'Build',
            project,
            input: new Artifact(buildStage.artifactId),
            outputs: [new Artifact(buildStage.artifactId)],
        });

        pipeline.addStage({
            stageName: 'Build',
            actions: [buildAction],
        });
       
    }

}