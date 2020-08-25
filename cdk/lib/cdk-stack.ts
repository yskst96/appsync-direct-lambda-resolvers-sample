import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as iam from '@aws-cdk/aws-iam'



export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const lambdaRole = iam.Role.fromRoleArn(this, 'direct-lambda-resolver-function-role', process.env.LAMBDA_ROLE_ARN as string)

    //lambda関数
    const lambdaFunction = new lambda.Function(this, 'direct-lambda-resolver-function', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.AssetCode.fromAsset('lambda/resolver', { exclude: ['*.ts'] }),
      role: lambdaRole,
      functionName: 'direct-lambda-resolver-function',
      memorySize: 128,
      timeout: cdk.Duration.seconds(10)
    })

  }
}
