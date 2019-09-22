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

import compounddefType from './compounddefType';

const templates: ElementTemplateMap = {
  compounddef: compounddefType,
};

export default (element: Element) =>
  applyToChildren(templates)(element).join('\n\n');
