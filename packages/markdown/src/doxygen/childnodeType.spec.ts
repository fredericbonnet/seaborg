import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import childnodeType from './childnodeType';

const render = (xml: string) => {
  const {
    children: [root],
  } = parseXml(xml);
  return childnodeType((root as Element).children[0] as Element);
};

describe('childnodeType', () => {
  specify('include relation', () => {
    const xml = `<node id="1"><childnode refid="2" relation="include"></childnode></node>`;
    const md = '1 --> 2';
    expect(render(xml)).to.equal(md);
  });
});
