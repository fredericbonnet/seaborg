import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import docParamListItem from './docParamListItem';

describe('docParamListItem', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return docParamListItem(root as Element);
  };

  specify('basic', () => {
    const xml = `<parameteritem>
          <parameternamelist>
              <parametername>paramName</parametername>
          </parameternamelist>
      </parameteritem>`;
    const md = '**paramName**';
    expect(render(xml)).to.equal(md);
  });
  specify('with description', () => {
    const xml = `<parameteritem>
          <parameternamelist>
              <parametername>paramName</parametername>
          </parameternamelist>
          <parameterdescription>
              <para>Description of the parameter.</para>
          </parameterdescription>
      </parameteritem>`;
    const md = `**paramName**: Description of the parameter.`;
    expect(render(xml)).to.equal(md);
  });
});
