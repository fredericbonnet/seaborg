import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import { init } from '..';
import incType from './incType';
import { before } from 'mocha';

const render = (xml: string) => {
  const {
    children: [root],
  } = parseXml(xml);
  return incType(root as Element);
};

before(init);

describe('incType', () => {
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
    const md = '[file.h](file_12345.md)';
    expect(render(xml)).to.equal(md);
  });
});
