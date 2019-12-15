/*
 * File generation
 */

import path from 'path';

import {
  configuration,
  file,
  context,
  RenderServiceRegistry,
} from '@seaborg/core/lib/services';
import {
  DoxygenType,
  CompoundType,
  CompoundKind,
} from '@seaborg/core/lib/models';

import jobQueue from './job-queue';

const render = RenderServiceRegistry.get('markdown');

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
const generateMainIndexFile = async (index: DoxygenType) => {
  return jobQueue.enqueue(async () => {
    const { mdExtension } = configuration.options;
    const outputFile = `index${mdExtension}`;

    console.log(`Generating [index](${outputFile})`);

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      render.mainPage(index)
    );

    console.log(`Done [index](${outputFile})`);
  });
};

/**
 * Generate global contents file from model
 *
 * @param index Index model
 */
const generateGlobalContentsFile = async (index: DoxygenType) => {
  return jobQueue.enqueue(async () => {
    const { contentsSuffix, mdExtension } = configuration.options;
    const outputFile = `global${contentsSuffix}${mdExtension}`;

    console.log(`Generating [global contents](${outputFile})`);

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      render.globalContentsPage(index)
    );

    console.log(`Done [global contents](${outputFile})`);
  });
};

/**
 * Generate global index file from model
 *
 * @param index Index model
 */
const generateGlobalIndexFile = async (index: DoxygenType) => {
  return jobQueue.enqueue(async () => {
    const { indexSuffix, mdExtension } = configuration.options;
    const outputFile = `global${indexSuffix}${mdExtension}`;

    console.log(`Generating [global index](${outputFile})`);

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      render.globalIndexPage(index)
    );

    console.log(`Done [global index](${outputFile})`);
  });
};

/**
 * Generate compound kind contents file from model
 *
 * @param kind Compound kind
 * @param compounds Compound models
 */
const generateCompoundContentsFile = async (
  kind: CompoundKind,
  compounds: CompoundType[]
) => {
  return jobQueue.enqueue(async () => {
    const { contentsSuffix, mdExtension } = configuration.options;
    const outputFile = `${kind}${contentsSuffix}${mdExtension}`;

    console.log(`Generating [${kind} contents](${outputFile})`);

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      render.compoundsContentsPage(kind, compounds)
    );

    console.log(`Done [${kind} contents](${outputFile})`);
  });
};

/**
 * Generate compound kind index file from model
 *
 * @param kind Compound kind
 * @param compounds Compound models
 */
const generateCompoundIndexFile = async (
  kind: CompoundKind,
  compounds: CompoundType[]
) => {
  return jobQueue.enqueue(async () => {
    const { indexSuffix, mdExtension } = configuration.options;
    const outputFile = `${kind}${indexSuffix}${mdExtension}`;

    console.log(`Generating [${kind} index](${outputFile})`);

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      render.compoundsIndexPage(kind, compounds)
    );

    console.log(`Done [${kind} index](${outputFile})`);
  });
};

/**
 * Generate compound file from XML
 *
 * @param compound Compound model
 *
 * @return generated file name
 */
const generateCompoundFile = async (compound: CompoundType) => {
  return jobQueue.enqueue(async () => {
    const { mdExtension } = configuration.options;
    const inputFile = `${compound.refid}.xml`;
    const outputFile = `${compound.refid}${mdExtension}`;

    console.log(
      `Generating ${compound.kind} [${compound.name}](${outputFile})`
    );

    const doxygen = await file.readXml(
      path.join(configuration.options.inputDir, inputFile)
    );

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      render.compoundPage(doxygen)
    );

    console.log(`Done ${compound.kind} [${compound.name}](${outputFile})`);

    return outputFile;
  });
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
