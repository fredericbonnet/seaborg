import fs from 'fs';
import path from 'path';

import configuration from './services/configuration.service';
import file from './services/file.service';
import doxygenIndex from './services/doxygen-index.service';
import context from './services/context.service';

import { DoxygenType, CompoundType, CompoundKind } from './models/doxygen';

import { registerHelpers } from '../helpers';
import mainIndexFileTemplate from '../templates/doxygenindex/main';
import compoundIndexFileTemplate from '../templates/doxygenindex/compounds';
import compoundFileTemplate from '../templates/DoxygenType';

// TODO better CLI argument parsing
const [, , inputDir, outputDir] = process.argv;
configuration.options = { inputDir, outputDir };

// Register helpers for template generation
registerHelpers();

// Ensure that the output directory exists
fs.mkdirSync(configuration.options.outputDir, { recursive: true });

// Read index file from input directory
doxygenIndex.read().then(index => {
  // Generate index files
  generateIndexFiles(index);

  // Generate compound files
  index.compounds.forEach(generateCompoundFile);
});

/**
 * Generate main index file from model
 *
 * @param index Index model
 */
const generateIndexFiles = (index: DoxygenType) => {
  // Main file
  const outputFile = 'index.md';
  console.log(`Generating [index](${outputFile})`);

  const oldContext = context.setContext({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    mainIndexFileTemplate(index)
  );
  context.setContext(oldContext);

  // Compound kind files
  index.compounds
    .map(compound => compound.kind)
    .reduce(
      (acc: CompoundKind[], kind) =>
        acc.includes(kind) ? acc : [...acc, kind],
      []
    )
    .forEach(kind => {
      generateCompoundIndexFiles(
        kind,
        index.compounds.filter(compound => compound.kind === kind)
      );
    });
};

/**
 * Generate compound kind index file from model
 *
 * @param kind Compound kind
 * @param compounds Compound models
 */
const generateCompoundIndexFiles = (
  kind: CompoundKind,
  compounds: CompoundType[]
) => {
  const outputFile = `${kind}_index.md`;
  console.log(`Generating [${kind} index](${outputFile})`);

  const oldContext = context.setContext({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    compoundIndexFileTemplate(kind, compounds)
  );
  context.setContext(oldContext);
};

/**
 * Generate compound file from XML
 *
 * @param compound Compound model
 */
const generateCompoundFile = async (compound: CompoundType) => {
  const inputFile = `${compound.refid}.xml`;
  const outputFile = `${compound.refid}.md`;
  console.log(`Generating ${compound.kind} [${compound.name}](${outputFile})`);

  const doxygen = await file.readFile(
    path.join(configuration.options.inputDir, inputFile)
  );

  const oldContext = context.setContext({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    compoundFileTemplate(doxygen)
  );
  context.setContext(oldContext);
};
