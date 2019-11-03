#!/usr/bin/env node
import fs from 'fs';

import { configuration, doxygenIndex } from '@seaborg/core/lib/services';

import { init as templateInit } from '@seaborg/markdown';
import { xsdString } from '@seaborg/markdown/lib/generic';
import { descriptionType } from '@seaborg/markdown/lib/doxygen';

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

// Inject doxygenIndex dependencies
doxygenIndex.inject({ xsdString, descriptionType });

// Initialize template generation
templateInit();

// Ensure that the output directory exists
fs.mkdirSync(configuration.options.outputDir, { recursive: true });

// Read & process Doxygen index file from input directory
doxygenIndex
  .read()
  .then(generateFiles)
  .then(() => console.log('Done!'));
