/*
  <xsd:complexType name="DoxygenType">
    <xsd:sequence maxOccurs="unbounded">
      <xsd:element name="compounddef" type="compounddefType" minOccurs="0" />
    </xsd:sequence>
    <xsd:attribute name="version" type="DoxVersionNumber" use="required" />
  </xsd:complexType>
 */

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildren } from '.';

import compounddefType from './compounddefType';

const mappers = (): Mappers => ({
  compounddef: compounddefType,
});

export default (element: Element) =>
  applyToChildren(mappers())(element).join('\n\n');
