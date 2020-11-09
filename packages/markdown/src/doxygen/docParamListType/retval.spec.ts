import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import retval from './retval';

describe('retval', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return retval(root as Element);
  };

  specify('empty', () => {
    const xml = `<parameterlist kind="retval"></parameterlist>`;
    const md = `
**Return values**:

`;
    expect(render(xml)).to.equal(md);
  });
  specify('one value', () => {
    const xml = `<parameterlist kind="retval">
          <parameteritem>
              <parameternamelist>
                  <parametername>value1</parametername>
              </parameternamelist>
              <parameterdescription>
                  <para>Description of the value.</para>
              </parameterdescription>
          </parameteritem>
      </parameterlist>`;
    const md = `
**Return values**:

* **value1**: Description of the value.
`;
    expect(render(xml)).to.equal(md);
  });
  specify('several values', () => {
    const xml = `<parameterlist kind="retval">
          <parameteritem>
              <parameternamelist>
                  <parametername>value1</parametername>
              </parameternamelist>
          </parameteritem>
          <parameteritem>
              <parameternamelist>
                  <parametername>value2</parametername>
              </parameternamelist>
              <parameterdescription>
                  <para>Description of the value.</para>
              </parameterdescription>
          </parameteritem>
      </parameterlist>`;
    const md = `
**Return values**:

* **value1**
* **value2**: Description of the value.
`;
    expect(render(xml)).to.equal(md);
  });
});
