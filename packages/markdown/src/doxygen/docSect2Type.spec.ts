import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import docSect2Type from './docSect2Type';

describe('docSect2Type', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return docSect2Type(root as Element);
  };

  specify('empty', () => {
    const xml = `<sect1></sect1>`;
    const md = '';
    expect(render(xml)).to.equal(md);
  });

  specify('simple', () => {
    const xml = `<sect1>Some text.</sect1>`;
    const md = 'Some text.';
    expect(render(xml)).to.equal(md);
  });

  specify('one paragraph', () => {
    const xml = `<sect1>
          <para>First paragraph.</para>
      </sect1>`;
    const md = 'First paragraph.';
    expect(render(xml)).to.equal(md);
  });

  specify('several paragraphs', () => {
    const xml = `<sect1>
          <para>First paragraph.</para><para>Second paragraph.</para>
      </sect1>`;
    const md = 'First paragraph.\n\n\nSecond paragraph.';
    expect(render(xml)).to.equal(md);
  });

  specify('with title', () => {
    const xml = `<sect1>
          <title>Title</title><para>First paragraph.</para><para>Second paragraph.</para>
      </sect1>`;
    const md = '### Title\n\nFirst paragraph.\n\n\nSecond paragraph.';
    expect(render(xml)).to.equal(md);
  });
});
