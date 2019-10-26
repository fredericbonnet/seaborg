/*
  <xsd:complexType name="memberRefType">
    <xsd:sequence>
      <xsd:element name="scope" />
      <xsd:element name="name" />
    </xsd:sequence>
    <xsd:attribute name="refid" type="xsd:string" />
    <xsd:attribute name="prot" type="DoxProtectionKind" />
    <xsd:attribute name="virt" type="DoxVirtualKind" />
    <xsd:attribute name="ambiguityscope" type="xsd:string" />
  </xsd:complexType>

  <xsd:simpleType name="DoxProtectionKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="public" />
      <xsd:enumeration value="protected" />
      <xsd:enumeration value="private" />
      <xsd:enumeration value="package" />
    </xsd:restriction>
  </xsd:simpleType>

  <xsd:simpleType name="DoxVirtualKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="non-virtual" />
      <xsd:enumeration value="virtual" />
      <xsd:enumeration value="pure-virtual" />
    </xsd:restriction>
  </xsd:simpleType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped } from '../mappers';
import { xsdString } from '../generic';

const template = Handlebars.compile(`{{ref refid "member" name}}`, {
  noEscape: true,
});

const mappers = (): Mappers => ({
  scope: xsdString,
  name: xsdString,
});

export default (element: Element) => {
  // TODO other attributes
  const {
    attributes: { refid },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, refid });
};
