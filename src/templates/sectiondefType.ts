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
import { TemplateMap, applyToChildren } from '.';

import xsdString from './xsd-string';
import descriptionType from './descriptionType';
import memberdefType from './memberdefType';

const templates: TemplateMap = {
  header: header => `## ${xsdString(header)}`,
  description: descriptionType,
  memberdef: memberdefType,
};

export default (element: Element) =>
  applyToChildren(templates)(element).join('\n\n');
