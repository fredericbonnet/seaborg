import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import incType from './incType';

describe('incType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return incType(root as Element);
  };

  specify('non-local', () => {
    const xml = `<includes local="no">file.h</includes>`;
    const md = '<file.h>';
    expect(render(xml)).to.equal(md);
  });

  specify('local', () => {
    const xml = `<includes local="yes">file.h</includes>`;
    const md = 'file.h';
    expect(render(xml)).to.equal(md);
  });

  specify('local with refid', () => {
    const xml = `<includes local="yes" refid="file_12345">file.h</includes>`;
    const md = '[file.h](file_12345.md#file_12345)';
    expect(render(xml)).to.equal(md);
  });
});
