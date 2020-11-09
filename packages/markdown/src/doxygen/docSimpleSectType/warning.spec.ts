import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import warning from './warning';

describe('warning', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return warning(root as Element);
  };

  specify('empty', () => {
    const xml = `<simplesect kind="warning"></simplesect>`;
    const md = `
!> **Warning** \\

`;
    expect(render(xml)).to.equal(md);
  });
  specify('one paragraph', () => {
    const xml = `<simplesect kind="warning">
          <para>First paragraph.</para>
      </simplesect>`;
    const md = `
!> **Warning** \\
First paragraph.

`;
    expect(render(xml)).to.equal(md);
  });
  specify('several paragraphs', () => {
    const xml = `<simplesect kind="warning">
          <para>First paragraph.</para>
          <para>Second paragraph.</para>
      </simplesect>`;
    const md = `
!> **Warning** \\
First paragraph.
\\
Second paragraph.

`;
    expect(render(xml)).to.equal(md);
  });
});
