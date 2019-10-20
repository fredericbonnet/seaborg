/*
  <xsd:complexType name="listingType">
    <xsd:sequence>
      <xsd:element name="codeline" type="codelineType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
    <xsd:attribute name="filename" type="xsd:string" use="optional"/>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildren } from '..';
import Handlebars from 'handlebars';

import codelineType from './codelineType';

// TODO language
const template = Handlebars.compile(
  `
\`\`\`c
{{#each lines}}
{{this}}
{{/each}}
\`\`\`
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  codeline: codelineType,
});

export default (element: Element) => {
  const lines = applyToChildren(mappers())(element);

  return template({ lines });
};
