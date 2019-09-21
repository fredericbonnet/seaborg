import fs from 'fs';
import path from 'path';
import parseXml, { Element } from '@rgrove/parse-xml';

import {
  withType,
  withName,
  asElementNode,
  asTextNode,
  toChildren,
  toText,
} from '../operators';

import doxygenTemplate from '../templates/doxygen';

const inputDir = '../colibri/doc/public/xml';
const outputDir = 'tmp/tmp';

fs.mkdirSync(outputDir, { recursive: true });

// Operators

// Get all compounds from index file
fs.readFile(path.join(inputDir, 'index.xml'), async (err, data) => {
  const root = parseXml(data.toString());
  const doxygenindex = root.children[0] as Element;
  doxygenindex.children
    .filter(withType('element'))
    .map(asElementNode)
    .filter(withName('compound'))
    .forEach(generateCompoundFile(inputDir, outputDir));
});

/**
 * Map function for compound file generation
 *
 * @param inputDir Input directory
 * @param outputDir Output directory
 */
const generateCompoundFile = (inputDir: string, outputDir: string) => (
  compound: Element
) => {
  const {
    attributes: { kind, refid },
  } = compound;
  const name = compound.children
    .filter(withType('element'))
    .map(asElementNode)
    .filter(withName('name'))
    .flatMap(toChildren)
    .filter(withType('text'))
    .map(asTextNode)
    .map(toText)
    .join('');

  console.log(`Generating ${kind} [${name}](${refid}.md)`);

  fs.readFile(path.join(inputDir, `${refid}.xml`), async (err, data) => {
    const root = parseXml(data.toString());
    const doxygen = root.children[0] as Element;

    fs.writeFileSync(
      path.join(outputDir, `${refid}.md`),
      await doxygenTemplate(doxygen)
    );
  });
};
