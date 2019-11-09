import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import linkType from './linkType';

const render = (xml: string) => {
  const {
    children: [root],
  } = parseXml(xml);
  return linkType((root as Element).children[0] as Element);
};

describe('linkType', () => {
  specify('regular', () => {
    const xml = `<node id="1"><link refid="file_12345"></link></node>`;
    const md = 'click 1 "file_12345.md"';
    expect(render(xml)).to.equal(md);
  });

  // TODO external
});
