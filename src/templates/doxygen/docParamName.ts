/*
  <xsd:complexType name="docParamName" mixed="true">
    <xsd:sequence>
      <xsd:element name="ref" type="refTextType" minOccurs="0" maxOccurs="1" />
    </xsd:sequence>
    <xsd:attribute name="direction" type="DoxParamDir" use="optional" />
  </xsd:complexType>

  <xsd:simpleType name="DoxParamDir">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="in"/>
      <xsd:enumeration value="out"/>
      <xsd:enumeration value="inout"/>
    </xsd:restriction>
  </xsd:simpleType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildren, $text } from '..';

import refTextType from './refTextType';
import textNode from '../textNode';

const mappers = (): Mappers => ({
  ref: refTextType,
  [$text]: textNode,
});

// TODO direction attribute
export default (element: Element) =>
  applyToChildren(mappers())(element).join('');
