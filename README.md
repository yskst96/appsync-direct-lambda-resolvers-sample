### 概要

AppSync の Direct Lambda Resolvers サンプル

## メモ

- source に指定した Lambda 関数の event 引数に Appsync から渡されたデータ(\$context)が入ってくる
- Lambda の戻り値は普通に gql のレスポンスとなるオブジェクトを直接返せばよい。

- Lambda で受け取る\$context の中身
  https://docs.aws.amazon.com/appsync/latest/devguide/resolver-context-reference.html

### 参考サイト

https://aws.amazon.com/jp/blogs/mobile/appsync-direct-lambda/
