#!/usr/bin/env node
import fs from 'fs';

import { configuration } from '@seaborg/core/lib/services';

import { init } from './init';
import { generateFiles } from './files';

// TODO better CLI argument parsing
// Read input/output dirs from command line
const [, , inputDir, outputDir] = process.argv;

// Attempt to read options from file `seaborg-options.json`
let options = {};
try {
  options = JSON.parse(fs.readFileSync('./seaborg-options.json').toString());
} catch {
  // Ignore
}
configuration.setOptions({ ...options, inputDir, outputDir });

// Ensure that the output directory exists
fs.mkdirSync(configuration.options.outputDir, { recursive: true });

// Read & process Doxygen files from input directory
init()
  .then(generateFiles)
  .then(() => console.log('Done!'));
