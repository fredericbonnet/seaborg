/*
 * File generation
 */

import path from 'path';

import { configuration, file } from '@seaborg/core/lib/services';
import {
  DoxygenType,
  CompoundType,
  CompoundKind,
} from '@seaborg/core/lib/models';

import jobQueue from './utils/job-queue';
import fileGenerator from './services/file-generator.service';

/** Generate all files from Doxygen index */
export const generateFiles = (index: DoxygenType) =>
  Promise.all([
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
const generateIndexFiles = (index: DoxygenType) =>
  Promise.all([
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

/**
 * Generate main index file from model
 *
 * @param index Index model
 */
const generateMainIndexFile = (index: DoxygenType) =>
  jobQueue.enqueue(async () => fileGenerator.generateMainIndexFile(index));

/**
 * Generate global contents file from model
 *
 * @param index Index model
 */
const generateGlobalContentsFile = (index: DoxygenType) =>
  jobQueue.enqueue(async () => fileGenerator.generateGlobalContentsFile(index));

/**
 * Generate global index file from model
 *
 * @param index Index model
 */
const generateGlobalIndexFile = (index: DoxygenType) =>
  jobQueue.enqueue(async () => fileGenerator.generateGlobalIndexFile(index));

/**
 * Generate compound kind contents file from model
 *
 * @param kind Compound kind
 * @param compounds Compound models
 */
const generateCompoundContentsFile = (
  kind: CompoundKind,
  compounds: CompoundType[]
) =>
  jobQueue.enqueue(async () =>
    fileGenerator.generateCompoundContentsFile(kind, compounds)
  );

/**
 * Generate compound kind index file from model
 *
 * @param kind Compound kind
 * @param compounds Compound models
 */
const generateCompoundIndexFile = (
  kind: CompoundKind,
  compounds: CompoundType[]
) =>
  jobQueue.enqueue(async () =>
    fileGenerator.generateCompoundIndexFile(kind, compounds)
  );

/**
 * Generate compound file from XML
 *
 * @param compound Compound model
 *
 * @return generated file name
 */
const generateCompoundFile = (compound: CompoundType) =>
  jobQueue.enqueue(async () => fileGenerator.generateCompoundFile(compound));

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
