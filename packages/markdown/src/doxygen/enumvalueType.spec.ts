import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import enumValueType, { def } from './enumValueType';

describe('enumValueType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return enumValueType(root as Element);
  };

  specify('basic', () => {
    const xml = `<enumvalue id="member_12345">
          <name>EnumName</name>
      </enumvalue>`;
    const md = `<a id="member_12345"></a>
#### Enumerator EnumName`;
    expect(render(xml)).to.equal(md);
  });

  specify('with description', () => {
    const xml = `<enumvalue id="member_12345">
          <name>EnumName</name>
          <briefdescription>Brief description</briefdescription>
          <detaileddescription>Detailed description</detaileddescription>
      </enumvalue>`;
    const md = `<a id="member_12345"></a>
#### Enumerator EnumName

Brief description

Detailed description`;
    expect(render(xml)).to.equal(md);
  });

  describe('def', () => {
    const render = (xml: string) => {
      const {
        children: [root],
      } = parseXml(xml);
      return def(root as Element);
    };

    specify('basic', () => {
      const xml = `<enumvalue>
            <name>EnumName</name>
        </enumvalue>`;
      const md = `EnumName`;
      expect(render(xml)).to.equal(md);
    });

    specify('with initializer', () => {
      const xml = `<enumvalue>
            <name>EnumName</name>
            <initializer>= 1</initializer>
        </enumvalue>`;
      const md = `EnumName = 1`;
      expect(render(xml)).to.equal(md);
    });
  });
});
