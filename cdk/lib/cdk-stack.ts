import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as iam from '@aws-cdk/aws-iam'
import { GraphQLApi, AuthorizationType, FieldLogLevel, MappingTemplate, SchemaDefinition } from '@aws-cdk/aws-appsync';



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

    // Apppsync
    const api = new GraphQLApi(this, `direct-lambda-resolver-api`, {
      name: "DirectLambdaResolverAPI",
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL,
      },
      schemaDefinition: SchemaDefinition.FILE,
      schemaDefinitionFile: './graphql/schema.graphql',
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
        },
      },
    });

    const lambdaSource = api.addLambdaDataSource('direc-lambda-resolver-source', lambdaFunction, { name: 'DirectLambdaResolverSource' })

    // Mapping Templateを設定しないLambdaのdatasourceを設定することでAppsyncがdirect resolverと推測する
    lambdaSource.createResolver({ typeName: 'Query', fieldName: 'getComment' })
    lambdaSource.createResolver({ typeName: 'Query', fieldName: 'listComments' })


  }
}
