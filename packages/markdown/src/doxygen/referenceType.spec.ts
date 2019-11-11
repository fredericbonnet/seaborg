import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import parseXml, { Element } from '@rgrove/parse-xml';
import { doxygenIndex, file } from '@seaborg/core/lib/services';

import referenceType from './referenceType';

describe('referenceType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return referenceType(root as Element);
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
    const xml = `<referencedby refid="member_67890">FunctionName</referencedby>`;
    const md = '[FunctionName](compound_12345.md#member_67890)';
    expect(render(xml)).to.equal(md);
  });

  specify('special chars', async () => {
    const xml = `<referencedby refid="member_67890">function_name&lt;T&gt;</referencedby>`;
    const md = '[function\\_name\\<T\\>](compound_12345.md#member_67890)';
    expect(render(xml)).to.equal(md);
  });
});
