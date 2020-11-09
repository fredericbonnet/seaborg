import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import paramType from './paramType';

describe('paramType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return paramType(root as Element);
  };

  specify('basic macro', () => {
    const xml = `<param><defname>MACRO_NAME</defname></param>`;
    const md = 'MACRO_NAME';
    expect(render(xml)).to.equal(md);
  });

  specify('basic type', () => {
    const xml = `<param>
          <type>int</type>
          <declname>varName</declname>
      </param>`;
    const md = 'int **varName**';
    expect(render(xml)).to.equal(md);
  });

  specify('type with value', () => {
    const xml = `<param>
          <type>int</type>
          <declname>varName</declname>
          <defval>1</defval>
      </param>`;
    const md = 'int **varName** = 1 ';
    expect(render(xml)).to.equal(md);
  });

  specify('type with description', () => {
    const xml = `<param>
          <type>char *</type>
          <declname>varName</declname>
          <briefdescription><para>This is a description.</para></briefdescription>
      </param>`;
    const md = 'char * **varName**: This is a description.';
    expect(render(xml)).to.equal(md);
  });

  specify('type with attributes', () => {
    const xml = `<param>
          <attributes>[AttributeName()]</attributes>
          <type>String</type>
          <declname>varName</declname>
      </param>`;
    const md = '_[AttributeName()]_ String **varName**';
    expect(render(xml)).to.equal(md);
  });
});
