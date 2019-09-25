import fs from 'fs';
import path from 'path';
import parseXml, { Element } from '@rgrove/parse-xml';

import configuration from './services/configuration.service';
import index from './services/index.service';
import { CompoundType } from './models/doxygenindex';
import doxygenTemplate from '../templates/DoxygenType';

const inputDir = '../colibri/doc/public/xml';
const outputDir = 'tmp/tmp';

// TODO CLI argument parsing
configuration.options = { inputDir, outputDir };

// Ensure that the output directory exists
fs.mkdirSync(configuration.options.outputDir, { recursive: true });

// Read index file from input directory
index.read().then(index => {
  // Generate index files
  //TODO

  // Generate compound files
  index.compounds.forEach(generateCompoundFile);
});

/**
 * Generate compound file from XML
 */
const generateCompoundFile = (compound: CompoundType) => {
  console.log(
    `Generating ${compound.kind} [${compound.name}](${compound.refid}.md)`
  );

  fs.readFile(
    path.join(configuration.options.inputDir, `${compound.refid}.xml`),
    (err, data) => {
      const root = parseXml(data.toString());
      const doxygen = root.children[0] as Element;

      fs.writeFileSync(
        path.join(configuration.options.outputDir, `${compound.refid}.md`),
        doxygenTemplate(doxygen)
      );
    }
  );
};
