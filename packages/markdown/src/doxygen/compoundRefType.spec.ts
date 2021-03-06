import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import compoundRefType from './compoundRefType';

describe('compoundRefType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return compoundRefType(root as Element);
  };

  specify('basic', () => {
    const xml = `<basecompoundref refid="class_12345">ClassName</basecompoundref>`;
    const md = '[ClassName](class_12345.md#class_12345)';
    expect(render(xml)).to.equal(md);
  });

  specify('special chars', () => {
    const xml = `<basecompoundref refid="class_12345">class_name&lt;T&gt;</basecompoundref>`;
    const md = '[class\\_name\\<T\\>](class_12345.md#class_12345)';
    expect(render(xml)).to.equal(md);
  });
});
