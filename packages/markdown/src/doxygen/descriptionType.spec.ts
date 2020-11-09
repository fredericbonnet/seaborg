import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import descriptionType from './descriptionType';

describe('descriptionType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return descriptionType(root as Element);
  };

  specify('empty', () => {
    const xml = `<briefdescription></briefdescription>`;
    const md = '';
    expect(render(xml)).to.equal(md);
  });

  specify('simple', () => {
    const xml = `<briefdescription>Some text.</briefdescription>`;
    const md = 'Some text.';
    expect(render(xml)).to.equal(md);
  });

  specify('one paragraph', () => {
    const xml = `<briefdescription>
          <para>First paragraph.</para>
      </briefdescription>`;
    const md = 'First paragraph.';
    expect(render(xml)).to.equal(md);
  });

  specify('several paragraphs', () => {
    const xml = `<detaileddescription>
          <para>First paragraph.</para><para>Second paragraph.</para>
      </detaileddescription>`;
    const md = 'First paragraph.\n\n\nSecond paragraph.';
    expect(render(xml)).to.equal(md);
  });

  specify('with title', () => {
    const xml = `<detaileddescription>
          <title>Title</title><para>First paragraph.</para><para>Second paragraph.</para>
      </detaileddescription>`;
    const md = '### Title\n\nFirst paragraph.\n\n\nSecond paragraph.';
    expect(render(xml)).to.equal(md);
  });
});
