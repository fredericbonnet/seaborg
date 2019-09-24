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
import { TemplateMap, applyToChildrenGrouped } from '.';
import Handlebars from 'handlebars';

import xsdString from './xsd-string';
import descriptionType from './descriptionType';
import memberdefType from './memberdefType';

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

const templates: TemplateMap = {
  header: xsdString,
  description: descriptionType,
  memberdef: memberdefType,
};

export default (element: Element) => {
  // TODO kind attribute
  const context = applyToChildrenGrouped(templates)(element);

  return template(context);
};
