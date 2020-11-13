import fs from 'fs';
import commander from 'commander';

/** Parse size option (must be an integer >=) */
const parseSize = (message: string) => (opt: string) => {
  const size = parseInt(opt);
  if (isNaN(size) || size < 1) throw message;
  return size;
};

/** Parse command line options (process.argv) */
export const parseArgs = () => {
  const program = new commander.Command();

  let hasConfig = false;
  let inputDir, outputDir;

  program
    .name('seaborg')
    .description('Seaborg converts Doxygen XML output to Markdown')
    .version('0.4.1')
    .option(
      '-c, --config-file <file>',
      'configuration file',
      './seaborg-config.json'
    )
    .on('option:config-file', () => {
      hasConfig = true;
    })
    .option(
      '-p, --use-pool <size>',
      'use job pool',
      parseSize("option '-p, --use-pool <size>' size must be an integer >= 1"),
      false
    )
    .option('-w, --use-workers', 'use worker threads', false)
    .arguments('<inputDir> <outputDir>')
    .action((...args) => {
      [inputDir, outputDir] = args;
    });

  try {
    program.parse(process.argv);
  } catch (e) {
    console.error(`error: ${e}`);
    process.exit(1);
  }
  if (program.args.length != 2) {
    program.outputHelp();
    process.exit(1);
  }

  const { usePool, useWorkers, configFile } = program.opts();

  // Attempt to read options from config file
  let options = {};
  try {
    options = JSON.parse(fs.readFileSync(configFile).toString());
  } catch {
    if (hasConfig) {
      console.error(`error reading configuration file ${configFile}`);
      process.exit(1);
    }
    // Ignore error when using default value
  }

  return { usePool, useWorkers, options: { ...options, inputDir, outputDir } };
};
