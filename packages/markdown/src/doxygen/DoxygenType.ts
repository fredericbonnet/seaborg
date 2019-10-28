/*
  <xsd:complexType name="DoxygenType">
    <xsd:sequence maxOccurs="unbounded">
      <xsd:element name="compounddef" type="compounddefType" minOccurs="0" />
    </xsd:sequence>
    <xsd:attribute name="version" type="DoxVersionNumber" use="required" />
  </xsd:complexType>
 */

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildren } from '../mappers';
import { compounddefType } from '.';

const template = Handlebars.compile(
  `
{{#each children}}
{{this}}

{{/each}}

{{references}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  compounddef: compounddefType,
});

export default (element: Element) => {
  const children = applyToChildren(mappers())(element);
  return template({ children });
};
