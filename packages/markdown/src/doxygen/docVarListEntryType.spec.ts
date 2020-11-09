import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import docVarListEntryType from './docVarListEntryType';

describe('docVarListEntryType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return docVarListEntryType(root as Element);
  };

  specify('basic', () => {
    const xml = `<varlistentry><term>Some text</term></varlistentry>`;
    const md = '\n<b>Some text</b>:\n';
    expect(render(xml)).to.equal(md);
  });
  specify('markup', () => {
    const xml = `<varlistentry><term>Some <emphasis>text</emphasis></term></varlistentry>`;
    const md = '\n<b>Some _text_</b>:\n';
    expect(render(xml)).to.equal(md);
  });
  // TODO
});
