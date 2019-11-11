import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import docListItemType from './docListItemType';

describe('docListItemType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return docListItemType(root as Element);
  };

  specify('empty', () => {
    const xml = `<listitem></listitem>`;
    const md = '';
    expect(render(xml)).to.equal(md);
  });
  specify('non-empty', () => {
    const xml = `<listitem><para>Item</para></listitem>`;
    const md = `Item\n`;
    expect(render(xml)).to.equal(md);
  });
});
