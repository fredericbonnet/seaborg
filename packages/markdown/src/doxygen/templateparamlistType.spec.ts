import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import templateparamlistType from './templateparamlistType';

describe('templateparamlistType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return templateparamlistType(root as Element);
  };

  specify('basic type', () => {
    const xml = `<templateparamlist>
          <param>
              <type>T</type>
          </param>
      </templateparamlist>`;
    const md = `
**Template parameters**:

* T
`;
    expect(render(xml)).to.equal(md);
  });

  specify('type with description', () => {
    const xml = `<templateparamlist>
          <param>
              <type>T</type>
              <briefdescription><para>This is a description.</para></briefdescription>
          </param>
      </templateparamlist>`;
    const md = `
**Template parameters**:

* T: This is a description.
`;
    expect(render(xml)).to.equal(md);
  });

  specify('multiple types', () => {
    const xml = `<templateparamlist>
          <param>
              <type>T</type>
          </param>
          <param>
              <type>U</type>
              <briefdescription><para>This is a description.</para></briefdescription>
          </param>
      </templateparamlist>`;
    const md = `
**Template parameters**:

* T
* U: This is a description.
`;
    expect(render(xml)).to.equal(md);
  });
});
