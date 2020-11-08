import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import linkedTextType from './linkedTextType';

describe('linkedTextType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return linkedTextType(root as Element);
  };

  specify('empty', () => {
    const xml = `<initializer></initializer>`;
    const md = '';
    expect(render(xml)).to.equal(md);
  });
  specify('simple text', () => {
    const xml = `<initializer>= 1</initializer>`;
    const md = '= 1';
    expect(render(xml)).to.equal(md);
  });
  specify('linked text', () => {
    const xml = `<initializer>= sizeof(<ref refid="sometype_12345" kindref="compound">SomeType</ref>)</initializer>`;
    const md = '= sizeof([SomeType](sometype_12345.md#sometype_12345))';
    expect(render(xml)).to.equal(md);
  });
});
