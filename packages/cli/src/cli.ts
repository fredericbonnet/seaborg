import fs from 'fs';
import path from 'path';

import {
  configuration,
  file,
  doxygenIndex,
  context,
} from '@seaborg/core/lib/services';
import {
  DoxygenType,
  CompoundType,
  CompoundKind,
} from '@seaborg/core/lib/models';

import { init as templateInit } from '@seaborg/markdown';
import { xsdString } from '@seaborg/markdown/lib/generic';
import {
  mainPage,
  globalContentsPage,
  globalIndexPage,
  compoundsContentsPage,
  compoundsIndexPage,
} from '@seaborg/markdown/lib/doxygen-index';
import {
  compoundPage as compoundPageTemplate,
  descriptionType,
} from '@seaborg/markdown/lib/doxygen';

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

// Read index file from input directory
doxygenIndex.read().then(index => {
  // Generate index files
  generateIndexFiles(index);

  // Generate compound files
  index.compounds.forEach(generateCompoundFile);
});

/**
 * Generate contents and index files from model
 *
 * @param index Index model
 */
const generateIndexFiles = (index: DoxygenType) => {
  // Main file
  generateMainIndexFile(index);

  // Global files
  generateGlobalContentsFile(index);
  generateGlobalIndexFile(index);

  // Compound kind files
  index.compounds
    .map(compound => compound.kind)
    .reduce(
      (acc: CompoundKind[], kind) =>
        acc.includes(kind) ? acc : [...acc, kind],
      []
    )
    .forEach(kind => {
      generateCompoundContentsFile(
        kind,
        index.compounds.filter(compound => compound.kind === kind)
      );
      generateCompoundIndexFile(
        kind,
        index.compounds.filter(compound => compound.kind === kind)
      );
    });
};

/**
 * Generate main index file from model
 *
 * @param index Index model
 */
const generateMainIndexFile = (index: DoxygenType) => {
  const { mdExtension } = configuration.options;
  const outputFile = `index${mdExtension}`;
  console.log(`Generating [index](${outputFile})`);

  context.setRoot({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    mainPage(index)
  );
};

/**
 * Generate global contents file from model
 *
 * @param index Index model
 */
const generateGlobalContentsFile = (index: DoxygenType) => {
  const { contentsSuffix, mdExtension } = configuration.options;
  const outputFile = `global${contentsSuffix}${mdExtension}`;
  console.log(`Generating [global contents](${outputFile})`);

  context.setRoot({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    globalContentsPage(index)
  );
};

/**
 * Generate global index file from model
 *
 * @param index Index model
 */
const generateGlobalIndexFile = (index: DoxygenType) => {
  const { indexSuffix, mdExtension } = configuration.options;
  const outputFile = `global${indexSuffix}${mdExtension}`;
  console.log(`Generating [global index](${outputFile})`);

  context.setRoot({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    globalIndexPage(index)
  );
};

/**
 * Generate compound kind contents file from model
 *
 * @param kind Compound kind
 * @param compounds Compound models
 */
const generateCompoundContentsFile = (
  kind: CompoundKind,
  compounds: CompoundType[]
) => {
  const { contentsSuffix, mdExtension } = configuration.options;
  const outputFile = `${kind}${contentsSuffix}${mdExtension}`;
  console.log(`Generating [${kind} contents](${outputFile})`);

  context.setRoot({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    compoundsContentsPage(kind, compounds)
  );
};

/**
 * Generate compound kind index file from model
 *
 * @param kind Compound kind
 * @param compounds Compound models
 */
const generateCompoundIndexFile = (
  kind: CompoundKind,
  compounds: CompoundType[]
) => {
  const { indexSuffix, mdExtension } = configuration.options;
  const outputFile = `${kind}${indexSuffix}${mdExtension}`;
  console.log(`Generating [${kind} index](${outputFile})`);

  context.setRoot({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    compoundsIndexPage(kind, compounds)
  );
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

  context.setRoot({ filename: outputFile });
  fs.writeFileSync(
    path.join(configuration.options.outputDir, outputFile),
    compoundPageTemplate(doxygen)
  );
};
