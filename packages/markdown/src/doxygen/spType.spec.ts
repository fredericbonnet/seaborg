import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import spType from './spType';

describe('spType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return spType(root as Element);
  };

  specify('basic', () => {
    const xml = `<sp/>`;
    const md = ' ';
    expect(render(xml)).to.equal(md);
  });
});
