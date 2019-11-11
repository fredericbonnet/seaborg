import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import nodeType from './nodeType';

describe('nodeType', () => {
  const render = (reverse: boolean) => (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return nodeType(reverse)(root as Element);
  };

  specify('empty', () => {
    const xml = `<node id="1"></node>`;
    const md = '1\n';
    expect(render(false)(xml)).to.equal(md);
  });
  specify('with label', () => {
    const xml = `<node id="1"><label>text</label></node>`;
    const md = `1["text"]\n`;
    expect(render(false)(xml)).to.equal(md);
  });
  specify('with link', () => {
    const xml = `<node id="1"><link refid="file_12345"></link></node>`;
    const md = `1\nclick 1 "file_12345.md"\n`;
    expect(render(false)(xml)).to.equal(md);
  });
  specify('full example', () => {
    const xml = `<node id="1">
          <label>text</label>
          <link refid="file_12345"/>
          <childnode refid="1" relation="include"></childnode>
          <childnode refid="2" relation="include"></childnode>
          <childnode refid="3" relation="include"></childnode>
      </node>`;
    const md = `1["text"]
click 1 "file_12345.md"
1 --> 1
1 --> 2
1 --> 3
`;
    expect(render(false)(xml)).to.equal(md);
  });
});
