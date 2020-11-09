import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import see from './see';

describe('return', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return see(root as Element);
  };

  specify('empty', () => {
    const xml = `<simplesect kind="see"></simplesect>`;
    const md = `
**See also**:

`;
    expect(render(xml)).to.equal(md);
  });
  specify('one paragraph', () => {
    const xml = `<simplesect kind="see">
          <para>First paragraph.</para>
      </simplesect>`;
    const md = `
**See also**:

First paragraph.

`;
    expect(render(xml)).to.equal(md);
  });
  specify('several paragraphs', () => {
    const xml = `<simplesect kind="see">
          <para>First paragraph.</para>
          <para>Second paragraph.</para>
      </simplesect>`;
    const md = `
**See also**:

First paragraph.

Second paragraph.

`;
    expect(render(xml)).to.equal(md);
  });
});
