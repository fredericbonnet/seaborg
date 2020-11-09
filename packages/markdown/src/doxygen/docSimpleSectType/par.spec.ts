import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import par from './par';

describe('par', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return par(root as Element);
  };

  specify('empty', () => {
    const xml = `<simplesect kind="par">
          <title>Title</title>
      </simplesect>`;
    const md = `
**Title**:

`;
    expect(render(xml)).to.equal(md);
  });
  specify('one paragraph', () => {
    const xml = `<simplesect kind="par">
          <title>Title</title>
          <para>First paragraph.</para>
      </simplesect>`;
    const md = `
**Title**:

First paragraph.

`;
    expect(render(xml)).to.equal(md);
  });
  specify('several paragraphs', () => {
    const xml = `<simplesect kind="par">
          <title>Title</title>
          <para>First paragraph.</para>
          <para>Second paragraph.</para>
      </simplesect>`;
    const md = `
**Title**:

First paragraph.

Second paragraph.

`;
    expect(render(xml)).to.equal(md);
  });
});
