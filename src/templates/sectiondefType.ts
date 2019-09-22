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
import { ElementTemplateMap, applyToChildren } from '.';

import xsdString from './xsd-string';
import descriptionType from './descriptionType';
import memberdefType from './memberdefType';

const templates: ElementTemplateMap = {
  header: header => `## ${xsdString(header)}`,
  description: descriptionType,
  memberdef: memberdefType,
};

export default (sectiondef: Element) =>
  applyToChildren(templates)(sectiondef).join('\n\n');
