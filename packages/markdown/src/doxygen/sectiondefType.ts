/*
  <xsd:complexType name="sectiondefType">
    <xsd:sequence>
      <xsd:element name="header" type="xsd:string" minOccurs="0" />
      <xsd:element name="description" type="descriptionType" minOccurs="0" />
      <xsd:element name="memberdef" type="memberdefType" maxOccurs="unbounded" />
    </xsd:sequence>
    <xsd:attribute name="kind" type="DoxSectionKind" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped } from '../mappers';
import { xsdString } from '../generic';
import { descriptionType, memberdefType } from '.';
import { labels } from './DoxSectionKind';

const template = Handlebars.compile(
  `
## {{header}}

{{description}}

{{#each memberdef}}
{{this}}
{{/each}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  header: xsdString,
  description: descriptionType,
  memberdef: memberdefType,
});

export default (element: Element) => {
  const {
    attributes: { kind },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, header: context.header || labels[kind] });
};
