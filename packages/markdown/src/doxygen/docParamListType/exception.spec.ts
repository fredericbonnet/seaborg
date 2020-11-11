import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import exception from './exception';

describe('exception', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return exception(root as Element);
  };

  specify('empty', () => {
    const xml = `<parameterlist kind="exception"></parameterlist>`;
    const md = '';
    expect(render(xml)).to.equal(md);
  });
  specify('one value', () => {
    const xml = `<parameterlist kind="exception">
          <parameteritem>
              <parameternamelist>
                  <parametername>Exception1</parametername>
              </parameternamelist>
              <parameterdescription>
                  <para>Description of the exception.</para>
              </parameterdescription>
          </parameteritem>
      </parameterlist>`;
    const md = `**Exceptions**:

* **Exception1**: Description of the exception.`;
    expect(render(xml)).to.equal(md);
  });
  specify('several values', () => {
    const xml = `<parameterlist kind="exception">
          <parameteritem>
              <parameternamelist>
                  <parametername>Exception1</parametername>
              </parameternamelist>
          </parameteritem>
          <parameteritem>
              <parameternamelist>
                  <parametername>Exception2</parametername>
              </parameternamelist>
              <parameterdescription>
                  <para>Description of the exception.</para>
              </parameterdescription>
          </parameteritem>
      </parameterlist>`;
    const md = `**Exceptions**:

* **Exception1**
* **Exception2**: Description of the exception.`;
    expect(render(xml)).to.equal(md);
  });
});
