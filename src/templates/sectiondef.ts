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

import xsdStringTemplate from './xsd_string';
import descriptionTemplate from './description';
import memberdefTemplate from './memberdef';

const templates: ElementTemplateMap = {
  header: header => `## ${xsdStringTemplate(header)}`,
  description: descriptionTemplate,
  memberdef: memberdefTemplate,
};

export default (sectiondef: Element) =>
  applyToChildren(templates)(sectiondef).join('\n\n');
