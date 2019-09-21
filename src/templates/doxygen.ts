/*
  <xsd:complexType name="DoxygenType">
    <xsd:sequence maxOccurs="unbounded">
      <xsd:element name="compounddef" type="compounddefType" minOccurs="0" />
    </xsd:sequence>
    <xsd:attribute name="version" type="DoxVersionNumber" use="required" />
  </xsd:complexType>
 */

import { Element } from '@rgrove/parse-xml';
import { withType, withName, asElementNode } from '../operators';

import compounddefTemplate from './compounddef';

export default (doxygen: Element) =>
  doxygen.children
    .filter(withType('element'))
    .map(asElementNode)
    .filter(withName('compounddef'))
    .map(asElementNode)
    .map(compounddefTemplate)
    .join('\n\n');
