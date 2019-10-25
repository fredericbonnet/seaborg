/*
  <xsd:complexType name="highlightType" mixed="true">
    <xsd:choice minOccurs="0" maxOccurs="unbounded">
      <xsd:element name="sp" type="spType" />
      <xsd:element name="ref" type="refTextType" />
    </xsd:choice>
    <xsd:attribute name="class" type="DoxHighlightClass" />
  </xsd:complexType>

  <xsd:simpleType name="DoxHighlightClass">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="comment" />
      <xsd:enumeration value="normal" />
      <xsd:enumeration value="preprocessor" />
      <xsd:enumeration value="keyword" />
      <xsd:enumeration value="keywordtype" />
      <xsd:enumeration value="keywordflow" />
      <xsd:enumeration value="stringliteral" />
      <xsd:enumeration value="charliteral" />
    </xsd:restriction>
  </xsd:simpleType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { xsdString, textNode } from '../generic';
import { spType } from '.';

const mappers = (): Mappers => ({
  sp: spType,
  ref: xsdString,
  [$text]: textNode,
});

// TODO class attribute
export default (element: Element) =>
  applyToChildren(mappers())(element).join('');