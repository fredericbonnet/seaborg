import fs from 'fs';
import path from 'path';

import { configuration, file, doxygenIndex, context } from '../core/services';
import { DoxygenType, CompoundType, CompoundKind } from '../core/models';

import { init as templateInit } from '../templates';
import {
  mainPage as mainPageTemplate,
  contentsPage as contentsPageTemplate,
  indexPage as indexPageTemplate,
} from '../templates/doxygen-index';
import { compoundPage as compoundPageTemplate } from '../templates/doxygen';

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

// Initialize template generation
templateInit();

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
  const { mdExtension } = configuration.options;
  const outputFile = `index${mdExtension}`;
  console.log(`Generating [index](${outputFile})`);

  const oldContext = context.setContext({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    mainPageTemplate(index)
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
      generateCompoundContentsFiles(
        kind,
        index.compounds.filter(compound => compound.kind === kind)
      );
      generateCompoundIndexFiles(
        kind,
        index.compounds.filter(compound => compound.kind === kind)
      );
    });
};

/**
 * Generate compound kind contents file from model
 *
 * @param kind Compound kind
 * @param compounds Compound models
 */
const generateCompoundContentsFiles = (
  kind: CompoundKind,
  compounds: CompoundType[]
) => {
  const { contentsSuffix, mdExtension } = configuration.options;
  const outputFile = `${kind}${contentsSuffix}${mdExtension}`;
  console.log(`Generating [${kind} contents](${outputFile})`);

  const oldContext = context.setContext({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    contentsPageTemplate(kind, compounds)
  );
  context.setContext(oldContext);
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
  const { indexSuffix, mdExtension } = configuration.options;
  const outputFile = `${kind}${indexSuffix}${mdExtension}`;
  console.log(`Generating [${kind} index](${outputFile})`);

  const oldContext = context.setContext({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    indexPageTemplate(kind, compounds)
  );
  context.setContext(oldContext);
};

/**
 * Generate compound file from XML
 *
 * @param compound Compound model
 */
const generateCompoundFile = async (compound: CompoundType) => {
  const { mdExtension } = configuration.options;
  const inputFile = `${compound.refid}.xml`;
  const outputFile = `${compound.refid}${mdExtension}`;
  console.log(`Generating ${compound.kind} [${compound.name}](${outputFile})`);

  const doxygen = await file.readFile(
    path.join(configuration.options.inputDir, inputFile)
  );

  const oldContext = context.setContext({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    compoundPageTemplate(doxygen)
  );
  context.setContext(oldContext);
};
