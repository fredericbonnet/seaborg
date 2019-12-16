#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { Worker, isMainThread, WorkerOptions } from 'worker_threads';
import * as Comlink from 'comlink';
import nodeEndpoint from 'comlink/dist/umd/node-adapter';

import { configuration, doxygenIndex } from '@seaborg/core/lib/services';

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

const useWorker = false;
// const useWorker = true;

// Read & process Doxygen files from input directory
init()
  .then(async index => {
    if (!useWorker) return generateFiles(index);

    const worker = new Worker(path.resolve(__dirname, './worker.js'), {
      execArgv: ['-r', 'ts-node/register'],
      workerData: {
        configuration: { options: configuration.options },
        doxygenIndex: { data: doxygenIndex.snapshot() },
      },
    });
    const api = Comlink.wrap(nodeEndpoint(worker));
    console.log('before');
    await api.generateFiles();
    console.log('after');
    api.exit();
    console.log('end');
  })
  .then(() => console.log('Done!'));
