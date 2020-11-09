import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import param from './param';

describe('param', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return param(root as Element);
  };

  specify('empty', () => {
    const xml = `<parameterlist kind="param"></parameterlist>`;
    const md = `
**Parameters**:

`;
    expect(render(xml)).to.equal(md);
  });
  specify('one value', () => {
    const xml = `<parameterlist kind="param">
          <parameteritem>
              <parameternamelist>
                  <parametername>param1</parametername>
              </parameternamelist>
              <parameterdescription>
                  <para>Description of the parameter.</para>
              </parameterdescription>
          </parameteritem>
      </parameterlist>`;
    const md = `
**Parameters**:

* **param1**: Description of the parameter.
`;
    expect(render(xml)).to.equal(md);
  });
  specify('several values', () => {
    const xml = `<parameterlist kind="param">
          <parameteritem>
              <parameternamelist>
                  <parametername>param1</parametername>
              </parameternamelist>
          </parameteritem>
          <parameteritem>
              <parameternamelist>
                  <parametername>param2</parametername>
              </parameternamelist>
              <parameterdescription>
                  <para>Description of the parameter.</para>
              </parameterdescription>
          </parameteritem>
      </parameterlist>`;
    const md = `
**Parameters**:

* **param1**
* **param2**: Description of the parameter.
`;
    expect(render(xml)).to.equal(md);
  });
});
