import path from 'path';
import chalk from 'chalk';
import { parseSchema } from '../parser';
import { renderTemplates } from '../generators/renderer';
import { writeOutput } from '../generators/writer';
import { requirePro } from '../pro';

interface GenerateOptions {
  output: string;
  dryRun?: boolean;
  dynamodb?: boolean;
  cdk?: boolean;
  prisma?: boolean;
}

export async function generateCommand(schemaPath: string, options: GenerateOptions) {
  if (options.prisma) {
    requirePro('--prisma');
  }

  console.log(chalk.cyan('⚡ zapit generate'));
  console.log(chalk.gray(`  Schema: ${schemaPath}`));
  console.log(chalk.gray(`  Output: ${options.output}`));
  if (options.prisma) {
    console.log(chalk.gray('  Mode: Prisma'));
  }
  console.log();

  // 1. Parse the Zod schema
  const resolved = path.resolve(schemaPath);
  const schema = await parseSchema(resolved);

  console.log(chalk.green(`✓ Parsed schema: ${schema.name}`));
  console.log(chalk.gray(`  Fields: ${schema.fields.map(f => f.name).join(', ')}`));
  console.log();

  // 2. Render templates
  const files = renderTemplates(schema, {
    dynamodb: options.dynamodb !== false && !options.prisma,
    cdk: options.cdk !== false,
    prisma: !!options.prisma,
  });

  // 3. Write or preview
  if (options.dryRun) {
    console.log(chalk.yellow('📋 Dry run — files that would be generated:\n'));
    for (const file of files) {
      console.log(chalk.cyan(`── ${file.path} ──`));
      console.log(file.content);
      console.log();
    }
  } else {
    await writeOutput(files, options.output);
    console.log(chalk.green(`✓ Generated ${files.length} files in ${options.output}`));
  }

  console.log(chalk.cyan('\n⚡ Done! Your API is ready.'));
}
