import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import childnodeType from './childnodeType';

describe('childnodeType', () => {
  const render = (reverse: boolean) => (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return childnodeType(reverse)((root as Element).children[0] as Element);
  };

  specify('include relation', () => {
    const xml = `<node id="1"><childnode refid="2" relation="include"></childnode></node>`;
    const md = '1 --> 2';
    expect(render(false)(xml)).to.equal(md);
  });
  specify('reverse include relation', () => {
    const xml = `<node id="1"><childnode refid="2" relation="include"></childnode></node>`;
    const md = '2 --> 1';
    expect(render(true)(xml)).to.equal(md);
  });
});
