import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import attention from './attention';

describe('attention', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return attention(root as Element);
  };

  specify('empty', () => {
    const xml = `<simplesect kind="attention"></simplesect>`;
    const md = `
!> **Attention** \\

`;
    expect(render(xml)).to.equal(md);
  });
  specify('one paragraph', () => {
    const xml = `<simplesect kind="attention">
          <para>First paragraph.</para>
      </simplesect>`;
    const md = `
!> **Attention** \\
First paragraph.

`;
    expect(render(xml)).to.equal(md);
  });
  specify('several paragraphs', () => {
    const xml = `<simplesect kind="attention">
          <para>First paragraph.</para>
          <para>Second paragraph.</para>
      </simplesect>`;
    const md = `
!> **Attention** \\
First paragraph.
\\
Second paragraph.

`;
    expect(render(xml)).to.equal(md);
  });
});
