import fs from 'fs';
import path from 'path';
import parseXml from '@rgrove/parse-xml';

const inputDir = '../colibri/doc/public/xml';
const outputDir = 'tmp/tmp';

fs.mkdirSync(outputDir, { recursive: true });

fs.readFile(path.join(inputDir, 'index.xml'), async (err, data) => {
  const root = parseXml(data.toString());
  console.log(root);
});
