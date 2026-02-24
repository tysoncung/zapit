export function initPackageJson(projectName: string): string {
  return JSON.stringify({
    name: projectName,
    version: '0.1.0',
    private: true,
    scripts: {
      build: 'nest build',
      start: 'nest start',
      'start:dev': 'nest start --watch',
      'start:prod': 'node dist/main',
      'cdk:deploy': 'cd cdk && npx cdk deploy',
      'cdk:diff': 'cd cdk && npx cdk diff',
    },
    dependencies: {
      '@nestjs/common': '^10',
      '@nestjs/core': '^10',
      '@nestjs/platform-fastify': '^10',
      '@aws-sdk/client-dynamodb': '^3',
      '@aws-sdk/lib-dynamodb': '^3',
      'aws-lambda-fastify': '^4',
      fastify: '^4',
      'reflect-metadata': '^0.2',
      rxjs: '^7',
      zod: '^3',
    },
    devDependencies: {
      '@nestjs/cli': '^10',
      '@types/node': '^22',
      typescript: '^5',
    },
  }, null, 2) + '\n';
}
