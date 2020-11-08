import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import parseXml, { Element } from '@rgrove/parse-xml';
import { doxygenIndex, file } from '@seaborg/core/lib/services';

import refTextType from './refTextType';

describe('refTextType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return refTextType(root as Element);
  };

  beforeEach(async () => {
    const read = sinon.stub(file, 'read');
    read.withArgs('index.xml').returns(
      Promise.resolve(
        `<doxygenindex>
          <compound refid="compound_12345">
            <member refid="member_67890"></member>
          </compound>
        </doxygenindex>`
      )
    );
    read.withArgs('compound_12345.xml').returns(
      Promise.resolve(
        `<doxygen>
          <compounddef id="compound_12345"></compounddef>
        </doxygen>`
      )
    );
    await doxygenIndex.read();
  });
  afterEach(() => sinon.restore());

  specify('compound', () => {
    const xml = `<ref refid="compound_12345" kindref="compound">some text</ref>`;
    const md = '[some text](compound_12345.md#compound_12345)';
    expect(render(xml)).to.equal(md);
  });

  specify('member', async () => {
    const xml = `<ref refid="member_67890" kindref="member">some text</ref>`;
    const md = '[some text](compound_12345.md#member_67890)';
    expect(render(xml)).to.equal(md);
  });
});
