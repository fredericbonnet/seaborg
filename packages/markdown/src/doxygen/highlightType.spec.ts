import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import highlightType from './highlightType';

describe('highlightType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return highlightType(root as Element);
  };

  specify('basic', () => {
    const xml = `<highlight>Basic</highlight>`;
    const md = 'Basic';
    expect(render(xml)).to.equal(md);
  });

  specify('complex', () => {
    const xml = `<highlight class="comment">/*<sp/>Comment<sp/>*/</highlight>`;
    const md = '/* Comment */';
    expect(render(xml)).to.equal(md);
  });

  specify('with reference', () => {
    const xml = `<highlight class="preprocessor">#include<sp/>&quot;<ref refid="file_12345" kindref="compound">file.h</ref>&quot;</highlight>`;
    const md = '#include "file.h"';
    expect(render(xml)).to.equal(md);
  });
});
