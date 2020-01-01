#!/usr/bin/env node
import fs from 'fs';

import { configuration } from '@seaborg/core/lib/services';

import { parseArgs } from './args';
import { init } from './init';
import { generateFiles } from './files';

// Parse command line and set configuration
const { usePool, useWorkers, options } = parseArgs();
configuration.setOptions(options);

// Ensure that the output directory exists
fs.mkdirSync(configuration.options.outputDir, { recursive: true });

// Read & process Doxygen files from input directory
console.log('Reading Doxygen index');
init()
  .then(async index => {
    console.log('Generating files');
    return generateFiles(index, { usePool, useWorkers });
  })
  .then(() => {
    console.log('Done!');
    process.exit();
  });
