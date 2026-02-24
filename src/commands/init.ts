import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { initPackageJson } from '../templates/init/package-json';
import { initTsconfig } from '../templates/init/tsconfig';
import { initAppModule } from '../templates/init/app-module';
import { initMain } from '../templates/init/main';
import { initCdkStack } from '../templates/init/cdk-stack';
import { initCdkApp } from '../templates/init/cdk-app';

export async function initCommand(options: { name?: string }) {
  const projectName = options.name || path.basename(process.cwd());
  const projectDir = options.name ? path.resolve(options.name) : process.cwd();

  console.log(chalk.cyan(`⚡ zapit init — scaffolding "${projectName}"\n`));

  const files: Array<{ path: string; content: string }> = [
    { path: 'package.json', content: initPackageJson(projectName) },
    { path: 'tsconfig.json', content: initTsconfig },
    { path: 'src/app.module.ts', content: initAppModule },
    { path: 'src/main.ts', content: initMain },
    { path: 'cdk/stack.ts', content: initCdkStack(projectName) },
    { path: 'cdk/app.ts', content: initCdkApp(projectName) },
    { path: 'cdk/cdk.json', content: JSON.stringify({ app: 'npx ts-node app.ts' }, null, 2) + '\n' },
    { path: '.gitignore', content: 'node_modules/\ndist/\ncdk.out/\n.env\n' },
  ];

  for (const file of files) {
    const fullPath = path.join(projectDir, file.path);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, file.content, 'utf-8');
    console.log(chalk.green(`  ✓ ${file.path}`));
  }

  console.log(chalk.cyan('\n⚡ Project scaffolded! Next steps:'));
  console.log(chalk.gray(`  cd ${projectName}`));
  console.log(chalk.gray('  npm install'));
  console.log(chalk.gray('  zapit generate <schema.ts>'));
  console.log(chalk.gray('  npm run start:dev'));
}
