import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import docHeadingType from './docHeadingType';

describe('docHeadingType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return docHeadingType(root as Element);
  };

  specify('level 1', () => {
    const xml = `<heading level="1">Title</heading>`;
    const md = '# Title';
    expect(render(xml)).to.equal(md);
  });
  specify('level 2', () => {
    const xml = `<heading level="2">Title</heading>`;
    const md = '## Title';
    expect(render(xml)).to.equal(md);
  });
  specify('level 3', () => {
    const xml = `<heading level="3">Title</heading>`;
    const md = '### Title';
    expect(render(xml)).to.equal(md);
  });
});
