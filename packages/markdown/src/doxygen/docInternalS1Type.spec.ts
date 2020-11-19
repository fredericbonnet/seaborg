import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import docInternalS1Type from './docInternalS1Type';

describe('docInternalS1Type', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return docInternalS1Type(root as Element);
  };

  specify('empty', () => {
    const xml = `<internal></internal>`;
    const md = '';
    expect(render(xml)).to.equal(md);
  });

  specify('simple', () => {
    const xml = `<internal>Some text.</internal>`;
    const md = 'Some text.';
    expect(render(xml)).to.equal(md);
  });

  specify('one paragraph', () => {
    const xml = `<internal>
          <para>First paragraph.</para>
      </internal>`;
    const md = 'First paragraph.';
    expect(render(xml)).to.equal(md);
  });

  specify('several paragraphs', () => {
    const xml = `<internal>
          <para>First paragraph.</para><para>Second paragraph.</para>
      </internal>`;
    const md = 'First paragraph.\n\n\nSecond paragraph.';
    expect(render(xml)).to.equal(md);
  });
});
