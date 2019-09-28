/*
  <xsd:complexType name="docSimpleSectType">
    <xsd:sequence>
      <xsd:element name="title" type="docTitleType" minOccurs="0" />
      <xsd:sequence minOccurs="0" maxOccurs="unbounded">
        <xsd:element name="para" type="docParaType" minOccurs="1" maxOccurs="unbounded" />
      </xsd:sequence>
    </xsd:sequence>
    <xsd:attribute name="kind" type="DoxSimpleSectKind" />
  </xsd:complexType>

  <xsd:simpleType name="DoxSimpleSectKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="see" />
      <xsd:enumeration value="return" />
      <xsd:enumeration value="author" />
      <xsd:enumeration value="authors" />
      <xsd:enumeration value="version" />
      <xsd:enumeration value="since" />
      <xsd:enumeration value="date" />
      <xsd:enumeration value="note" />
      <xsd:enumeration value="warning" />
      <xsd:enumeration value="pre" />
      <xsd:enumeration value="post" />
      <xsd:enumeration value="copyright" />
      <xsd:enumeration value="invariant" />
      <xsd:enumeration value="remark" />
      <xsd:enumeration value="attention" />
      <xsd:enumeration value="par" />
      <xsd:enumeration value="rcs" />
    </xsd:restriction>
  </xsd:simpleType>
*/

import { Element } from '@rgrove/parse-xml';

export default (element: Element) => {
  const {
    attributes: { kind },
  } = element;
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  return template(element);
};
