import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import parseXml, { Element } from '@rgrove/parse-xml';
import { doxygenIndex, file } from '@seaborg/core/lib/services';

import reimplementType from './reimplementType';

describe('reimplementType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return reimplementType(root as Element);
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

  specify('basic', async () => {
    const xml = `<reimplements refid="member_67890">methodName</reimplements>`;
    const md = '[methodName](compound_12345.md#member_67890)';
    expect(render(xml)).to.equal(md);
  });

  specify('special chars', async () => {
    const xml = `<reimplements refid="member_67890">member_name&lt;T&gt;</reimplements>`;
    const md = '[member\\_name\\<T\\>](compound_12345.md#member_67890)';
    expect(render(xml)).to.equal(md);
  });
});
