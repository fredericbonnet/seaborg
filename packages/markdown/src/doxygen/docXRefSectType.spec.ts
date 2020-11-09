import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import docXRefSectType from './docXRefSectType';

describe('docXRefSectType', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return docXRefSectType(root as Element);
  };

  specify('basic', () => {
    const xml = `<xrefsect>
          <xreftitle>Title</xreftitle>
          <xrefdescription><para>Description</para></xrefdescription>
      </xrefsect>`;
    const md = '\n**Title**:\n\nDescription\n';
    expect(render(xml)).to.equal(md);
  });
});
