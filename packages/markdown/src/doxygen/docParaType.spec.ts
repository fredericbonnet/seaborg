import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import docParaType from './docParaType';

describe('docParaType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return docParaType(root as Element);
  };

  specify('empty', () => {
    const xml = `<para></para>`;
    const md = '\n';
    expect(render(xml)).to.equal(md);
  });
  specify('text', () => {
    const xml = `<para>Some text</para>`;
    const md = `Some text\n`;
    expect(render(xml)).to.equal(md);
  });
  specify('with markup', () => {
    const xml = `<para>Some <bold>bold</bold> and <emphasis>italic</emphasis> text</para>`;
    const md = `Some **bold** and _italic_ text\n`;
    expect(render(xml)).to.equal(md);
  });
  specify('merged see sections', () => {
    const xml = `<para>
<simplesect kind="par"><title>Section 1</title><para>Text 1</para></simplesect>
<simplesect kind="par"><title>Section 2</title><para>Text 2</para></simplesect>
<simplesect kind="return"><para>Returned value</para></simplesect>
<simplesect kind="see"><para>Reference 1</para></simplesect>
<simplesect kind="see"><para>Reference 2</para></simplesect>
</para>`;
    const md = `

**Section 1**:

Text 1



**Section 2**:

Text 2



**Returns**:

Returned value





**See also**: Reference 1, Reference 2
`;
    expect(render(xml)).to.equal(md);
  });
});
