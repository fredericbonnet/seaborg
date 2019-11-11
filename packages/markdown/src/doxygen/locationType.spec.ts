import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import locationType from './locationType';

describe('locationType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return locationType(root as Element);
  };

  specify('without line number', () => {
    const xml = `<location file="file.h"></location>`;
    const md = '**Location**: `file.h`';
    expect(render(xml)).to.equal(md);
  });
  specify('with line number', () => {
    const xml = `<location file="file.h" line="123"></location>`;
    const md = '**Definition**: `file.h` (line 123)';
    expect(render(xml)).to.equal(md);
  });
});
