import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { GeneratedFile } from './renderer';

export async function writeOutput(files: GeneratedFile[], outputDir: string): Promise<void> {
  for (const file of files) {
    const fullPath = path.join(outputDir, file.path);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, file.content, 'utf-8');
    console.log(chalk.green(`  ✓ ${file.path}`));
  }
}
