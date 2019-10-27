/*
  <xsd:complexType name="docVarListEntryType">
    <xsd:sequence>
      <xsd:element name="term" type="docTitleType" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildren } from '../mappers';
import { docTitleType } from '.';

const template = Handlebars.compile(
  `
<b>{{text}}</b>:
`,
  {
    noEscape: true,
  }
);

const mappers = (): Mappers => ({
  term: docTitleType,
});

export default (element: Element) => {
  const text = applyToChildren(mappers())(element)
    .join('')
    .trim();
  return template({ text });
};
