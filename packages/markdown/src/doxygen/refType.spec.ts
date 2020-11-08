import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import refType from './refType';

describe('refType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return refType(root as Element);
  };

  specify('basic', async () => {
    const xml = `<innerclass refid="class_12345">ClassName</innerclass>`;
    const md = '[ClassName](class_12345.md#class_12345)';
    expect(render(xml)).to.equal(md);
  });

  specify('special chars', async () => {
    const xml = `<innerclass refid="class_12345">class_name&lt;T&gt;</innerclass>`;
    const md = '[class\\_name\\<T\\>](class_12345.md#class_12345)';
    expect(render(xml)).to.equal(md);
  });
});
