import chalk from 'chalk';

export function isPro(): boolean {
  return !!process.env.ZAPIT_LICENSE_KEY;
}

export function requirePro(feature: string): void {
  if (!isPro()) {
    console.error(
      chalk.yellow(`\n⚡ "${feature}" is a zapit Pro feature.\n`) +
      chalk.gray('   Get your license at ') +
      chalk.cyan('https://zapit.dev') +
      '\n'
    );
    process.exit(1);
  }
}
