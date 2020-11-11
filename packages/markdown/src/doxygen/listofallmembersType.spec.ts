import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import parseXml, { Element } from '@rgrove/parse-xml';
import { doxygenIndex, file } from '@seaborg/core/lib/services';

import listofallmembersType from './listofallmembersType';

describe('listofallmembersType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return listofallmembersType(root as Element);
  };

  beforeEach(async () => {
    const read = sinon.stub(file, 'read');
    read.withArgs('index.xml').returns(
      Promise.resolve(
        `<doxygenindex>
          <compound refid="compound_12345">
            <member refid="member_67890"></member>
            <member refid="member_98765"></member>
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

  specify('empty', () => {
    const xml = `<listofallmembers></listofallmembers>`;
    const md = `## Members`;
    expect(render(xml)).to.equal(md);
  });

  specify('one member', () => {
    const xml = `<listofallmembers>
          <member refid="member_67890"><scope>SomeType</scope><name>memberName</name></member>
      </listofallmembers>`;
    const md = `## Members

* [memberName](compound_12345.md#member_67890)`;
    expect(render(xml)).to.equal(md);
  });

  specify('multiple types', () => {
    const xml = `<listofallmembers>
          <member refid="member_67890"><scope>SomeType</scope><name>memberName1</name></member>
          <member refid="member_98765"><scope>SomeType</scope><name>memberName2</name></member>
      </listofallmembers>`;
    const md = `## Members

* [memberName1](compound_12345.md#member_67890)
* [memberName2](compound_12345.md#member_98765)`;
    expect(render(xml)).to.equal(md);
  });
});
