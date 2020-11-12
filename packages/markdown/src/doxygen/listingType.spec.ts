import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';
import { context } from '@seaborg/core/lib/services';

import listingType from './listingType';

describe('listingType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return listingType(root as Element);
  };

  specify('empty', () => {
    const xml = `<programlisting></programlisting>`;
    const md = `\`\`\`

\`\`\``;
    expect(render(xml)).to.equal(md);
  });

  specify('no language', () => {
    const xml = `<programlisting>
          <codeline><highlight class="normal">Basic</highlight></codeline>
          <codeline><highlight class="normal">Normal<sp/></highlight><highlight class="comment">/*<sp/>Comment<sp/>*/</highlight></codeline>
      </programlisting>`;
    const md = `\`\`\`
Basic
Normal /* Comment */
\`\`\``;
    expect(render(xml)).to.equal(md);
  });

  describe('C++', () => {
    before(() => {
      context.pushState({ language: 'C++' });
    });
    after(() => {
      context.popState();
    });
    specify('with language code', () => {
      const xml = `<programlisting>
            <codeline><highlight class="normal">Basic</highlight></codeline>
            <codeline><highlight class="normal">Normal<sp/></highlight><highlight class="comment">/*<sp/>Comment<sp/>*/</highlight></codeline>
        </programlisting>`;
      const md = `\`\`\`cpp
Basic
Normal /* Comment */
\`\`\``;
      expect(render(xml)).to.equal(md);
    });
  });
});
