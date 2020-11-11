import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import docAnchorType from './docAnchorType';

describe('docAnchorType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return docAnchorType(root as Element);
  };

  specify('regular', () => {
    const xml = `<anchor id="member_12345"/>`;
    const md = '<a id="member_12345"></a>\n';
    expect(render(xml)).to.equal(md);
  });
});
