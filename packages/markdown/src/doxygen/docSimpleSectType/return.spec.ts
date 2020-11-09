import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import _return_ from './return';

describe('return', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return _return_(root as Element);
  };

  specify('empty', () => {
    const xml = `<simplesect kind="return"></simplesect>`;
    const md = `
**Returns**:

`;
    expect(render(xml)).to.equal(md);
  });
  specify('one paragraph', () => {
    const xml = `<simplesect kind="return">
          <para>First paragraph.</para>
      </simplesect>`;
    const md = `
**Returns**:

First paragraph.

`;
    expect(render(xml)).to.equal(md);
  });
  specify('several paragraphs', () => {
    const xml = `<simplesect kind="return">
          <para>First paragraph.</para>
          <para>Second paragraph.</para>
      </simplesect>`;
    const md = `
**Returns**:

First paragraph.

Second paragraph.

`;
    expect(render(xml)).to.equal(md);
  });
});
