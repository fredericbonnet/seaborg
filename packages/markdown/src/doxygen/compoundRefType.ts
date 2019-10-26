/*
  <xsd:complexType name="compoundRefType">
    <xsd:simpleContent>
      <xsd:extension base="xsd:string">
        <xsd:attribute name="refid" type="xsd:string" use="optional" />
        <xsd:attribute name="prot" type="DoxProtectionKind" />
        <xsd:attribute name="virt" type="DoxVirtualKind" />
      </xsd:extension>
    </xsd:simpleContent>
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

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';

const template = Handlebars.compile(`{{ref refid "compound" (md text)}}`, {
  noEscape: true,
});

const mappers = (): Mappers => ({
  [$text]: textNode,
});

export default (element: Element) => {
  // TODO other attributes
  const {
    attributes: { refid },
  } = element;
  const text = applyToChildren(mappers())(element).join('');

  return template({ refid, text });
};
