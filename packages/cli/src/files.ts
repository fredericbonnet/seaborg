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

const render = RenderServiceRegistry.get('markdown');

/** Generate all files from Doxygen index */
export const generateFiles = async (index: DoxygenType) => {
  // Generate index files
  await generateIndexFiles(index);

  // Generate all compound files
  const list = await Promise.all(index.compounds.map(generateCompoundFile));

  // Generate compound list file with all the generated files above
  generateCompoundListFile(list);
};

/**
 * Generate contents and index files from model
 *
 * @param index Index model
 */
const generateIndexFiles = async (index: DoxygenType) => {
  // Main file
  await generateMainIndexFile(index);

  // Global files
  await generateGlobalContentsFile(index);
  await generateGlobalIndexFile(index);

  // Compound kind files
  index.compounds
    .map(compound => compound.kind)
    .reduce(
      (acc: CompoundKind[], kind) =>
        acc.includes(kind) ? acc : [...acc, kind],
      []
    )
    .forEach(async kind => {
      const compounds = index.compounds.filter(
        compound => compound.kind === kind
      );
      await generateCompoundContentsFile(kind, compounds);
      await generateCompoundIndexFile(kind, compounds);
    });
};

/**
 * Generate main index file from model
 *
 * @param index Index model
 */
const generateMainIndexFile = async (index: DoxygenType) => {
  const { mdExtension } = configuration.options;
  const outputFile = `index${mdExtension}`;

  console.log(`Generating [index](${outputFile})`);
  context.setRoot({ filename: outputFile });
  await file.write(
    path.join(configuration.options.outputDir, outputFile),
    render.mainPage(index)
  );
};

/**
 * Generate global contents file from model
 *
 * @param index Index model
 */
const generateGlobalContentsFile = async (index: DoxygenType) => {
  const { contentsSuffix, mdExtension } = configuration.options;
  const outputFile = `global${contentsSuffix}${mdExtension}`;

  console.log(`Generating [global contents](${outputFile})`);
  context.setRoot({ filename: outputFile });
  await file.write(
    path.join(configuration.options.outputDir, outputFile),
    render.globalContentsPage(index)
  );
};

/**
 * Generate global index file from model
 *
 * @param index Index model
 */
const generateGlobalIndexFile = async (index: DoxygenType) => {
  const { indexSuffix, mdExtension } = configuration.options;
  const outputFile = `global${indexSuffix}${mdExtension}`;

  console.log(`Generating [global index](${outputFile})`);
  context.setRoot({ filename: outputFile });
  await file.write(
    path.join(configuration.options.outputDir, outputFile),
    render.globalIndexPage(index)
  );
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
  const { contentsSuffix, mdExtension } = configuration.options;
  const outputFile = `${kind}${contentsSuffix}${mdExtension}`;

  console.log(`Generating [${kind} contents](${outputFile})`);
  context.setRoot({ filename: outputFile });
  await file.write(
    path.join(configuration.options.outputDir, outputFile),
    render.compoundsContentsPage(kind, compounds)
  );
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
  const { indexSuffix, mdExtension } = configuration.options;
  const outputFile = `${kind}${indexSuffix}${mdExtension}`;

  console.log(`Generating [${kind} index](${outputFile})`);
  context.setRoot({ filename: outputFile });
  await file.write(
    path.join(configuration.options.outputDir, outputFile),
    render.compoundsIndexPage(kind, compounds)
  );
};

/**
 * Generate compound file from XML
 *
 * @param compound Compound model
 *
 * @return generated file name
 */
const generateCompoundFile = async (compound: CompoundType) => {
  const { mdExtension } = configuration.options;
  const inputFile = `${compound.refid}.xml`;
  const outputFile = `${compound.refid}${mdExtension}`;

  const doxygen = await file.readXml(
    path.join(configuration.options.inputDir, inputFile)
  );

  console.log(`Generating ${compound.kind} [${compound.name}](${outputFile})`);
  context.setRoot({ filename: outputFile });
  await file.write(
    path.join(configuration.options.outputDir, outputFile),
    render.compoundPage(doxygen)
  );

  return outputFile;
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
