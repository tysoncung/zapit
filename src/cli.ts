#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { generateCommand } from './commands/generate';
import { initCommand } from './commands/init';

const program = new Command();

program
  .name('zapit')
  .description('⚡ Zap a Zod schema into a fully typed NestJS CRUD API')
  .version('0.2.0');

program
  .command('generate <schema>')
  .alias('g')
  .description('Generate a NestJS CRUD module from a Zod schema file')
  .option('-o, --output <dir>', 'Output directory', './src')
  .option('-d, --dry-run', 'Preview generated files without writing')
  .option('--no-dynamodb', 'Skip DynamoDB repository generation')
  .option('--no-cdk', 'Skip CDK stack generation')
  .option('--prisma', 'Generate Prisma repository instead of DynamoDB (Pro)')
  .action(generateCommand);

program
  .command('init')
  .description('Initialize a new zapit-ready NestJS project')
  .option('-n, --name <name>', 'Project name')
  .action(initCommand);

program.parse();
