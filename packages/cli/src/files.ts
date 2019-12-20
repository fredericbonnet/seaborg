/*
 * File generation
 */

import path from 'path';
import { Worker } from 'worker_threads';
import * as Comlink from 'comlink';
import nodeEndpoint from 'comlink/dist/umd/node-adapter';

import { configuration, file, doxygenIndex } from '@seaborg/core/lib/services';
import {
  DoxygenType,
  CompoundType,
  CompoundKind,
} from '@seaborg/core/lib/models';

import {
  JobQueueFactory,
  JobQueue,
  SimpleJobQueueAdapter,
  PooledJobQueueAdapter,
} from './utils/job-queue';
import {
  FileGeneratorService,
  FileGeneratorServiceFactory,
} from './services/file-generator.service';

export type Options = {
  usePool: false | number;
  useWorkers: boolean;
};
const defaultOptions: Options = {
  usePool: false,
  useWorkers: false,
};

/** Detect Typescript environment for worker configuration */
const isTypescript = path.extname(__filename) === '.ts';

/** Generate all files from Doxygen index */
export const generateFiles = (
  index: DoxygenType,
  options: Options = defaultOptions
) => {
  type JobContext = { fileGenerator: FileGeneratorService };

  let jobQueue: JobQueue;
  if (!options.usePool) {
    // Use non-pooled queue in the main thread
    jobQueue = JobQueueFactory.create();
    const fileGenerator = FileGeneratorServiceFactory.create();
    (jobQueue as SimpleJobQueueAdapter).initContext(() => {
      return { fileGenerator };
    });
  } else if (!options.useWorkers) {
    // Use pooled queue in the main thread
    jobQueue = JobQueueFactory.createPooled(options.usePool);
    const fileGenerator = FileGeneratorServiceFactory.create();
    (jobQueue as PooledJobQueueAdapter).initContext(() => {
      return { fileGenerator };
    });
  } else {
    // Use multithreaded job queue
    jobQueue = JobQueueFactory.createPooled(options.usePool);
    (jobQueue as PooledJobQueueAdapter).initContext(() => {
      const script = `
const { workerData } = require('worker_threads');
const { initWorker } = require(workerData.init);
initWorker();
`;
      const worker = new Worker(script, {
        eval: true,
        execArgv: isTypescript ? ['-r', 'ts-node/register'] : undefined,
        workerData: {
          init: path.resolve(__dirname, './init'),
          configuration: { options: configuration.options },
          doxygenIndex: { data: doxygenIndex.snapshot() },
        },
      });

      // Proxy file generator service to worker through Comlink
      const fileGenerator = Comlink.wrap(nodeEndpoint(worker));
      return { fileGenerator };
    });
  }

  return Promise.all([
    // Generate index files
    generateIndexFiles(index),

    // Generate all compound files
    Promise.all(index.compounds.map(generateCompoundFile)).then(
      // Generate compound list file with all the generated files above
      generateCompoundListFile
    ),
  ]);

  /**
   * Generate contents and index files from model
   *
   * @param index Index model
   */
  function generateIndexFiles(index: DoxygenType) {
    return Promise.all([
      // Main file
      generateMainIndexFile(index),

      // Global files
      generateGlobalContentsFile(index),
      generateGlobalIndexFile(index),

      // Compound kind files
      ...index.compounds
        .map(compound => compound.kind)
        .reduce(
          (acc: CompoundKind[], kind) =>
            acc.includes(kind) ? acc : [...acc, kind],
          []
        )
        .flatMap(kind => {
          const compounds = index.compounds.filter(
            compound => compound.kind === kind
          );
          return [
            generateCompoundContentsFile(kind, compounds),
            generateCompoundIndexFile(kind, compounds),
          ];
        }),
    ]);
  }

  //
  // Jobs
  //

  function generateMainIndexFile(index: DoxygenType) {
    return jobQueue.enqueue(async ({ fileGenerator }: JobContext) =>
      fileGenerator.generateMainIndexFile(index)
    );
  }
  function generateGlobalContentsFile(index: DoxygenType) {
    return jobQueue.enqueue(async ({ fileGenerator }: JobContext) =>
      fileGenerator.generateGlobalContentsFile(index)
    );
  }
  function generateGlobalIndexFile(index: DoxygenType) {
    return jobQueue.enqueue(async ({ fileGenerator }: JobContext) =>
      fileGenerator.generateGlobalIndexFile(index)
    );
  }
  function generateCompoundContentsFile(
    kind: CompoundKind,
    compounds: CompoundType[]
  ) {
    return jobQueue.enqueue(async ({ fileGenerator }: JobContext) =>
      fileGenerator.generateCompoundContentsFile(kind, compounds)
    );
  }
  function generateCompoundIndexFile(
    kind: CompoundKind,
    compounds: CompoundType[]
  ) {
    return jobQueue.enqueue(async ({ fileGenerator }: JobContext) =>
      fileGenerator.generateCompoundIndexFile(kind, compounds)
    );
  }
  function generateCompoundFile(compound: CompoundType) {
    return jobQueue.enqueue(async ({ fileGenerator }: JobContext) =>
      fileGenerator.generateCompoundFile(compound)
    );
  }
};

/**
 * Generate compound list file as a IIFE Javascript file for browser consumption
 *
 * Usage:
 * ```html
 * <script id="compound-list" data-varname="xxx" src="compound-list.js"></script>
 * ```
 *
 * Where `data-varname` gives the name of the global variable that will receive
 * the list.
 *
 * The main use case for this file is as a search index for Docsify.
 *
 * @param files File list
 */
const generateCompoundListFile = async (files: string[]) => {
  const outputFile = 'compound-list.js';

  console.log(`Generating [compound list file](${outputFile})`);
  await file.write(
    path.join(configuration.options.outputDir, outputFile),
    `(function() {
  const script = document.getElementById('compound-list');
  const varname = script.getAttribute('data-varname');
  this[varname] = ${JSON.stringify(files)};
  })();`
  );
};
