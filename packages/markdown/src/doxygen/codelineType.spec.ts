import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import codelineType from './codelineType';

describe('codelineType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return codelineType(root as Element);
  };

  specify('basic', () => {
    const xml = `<codeline><highlight class="normal">Basic</highlight></codeline>`;
    const md = 'Basic';
    expect(render(xml)).to.equal(md);
  });

  specify('complex', () => {
    const xml = `<codeline>
          <highlight class="normal">Normal<sp/></highlight>
          <highlight class="comment">/*<sp/>Comment<sp/>*/</highlight>
      </codeline>`;
    const md = 'Normal /* Comment */';
    expect(render(xml)).to.equal(md);
  });
});
