/*
  <xsd:complexType name="DoxygenType">
    <xsd:sequence maxOccurs="unbounded">
      <xsd:element name="compounddef" type="compounddefType" minOccurs="0" />
    </xsd:sequence>
    <xsd:attribute name="version" type="DoxVersionNumber" use="required" />
  </xsd:complexType>
 */

import { Element } from '@rgrove/parse-xml';
import { ElementTemplateMap, applyToChildren } from '.';

import compounddefTemplate from './compounddef';

const templates: ElementTemplateMap = {
  compounddef: compounddefTemplate,
};

export default (doxygen: Element) =>
  applyToChildren(templates)(doxygen).join('\n\n');
