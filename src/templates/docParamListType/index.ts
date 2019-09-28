/*
  <xsd:complexType name="docParamListType">
    <xsd:sequence>
      <xsd:element name="parameteritem" type="docParamListItem" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
    <xsd:attribute name="kind" type="DoxParamListKind" /> 
  </xsd:complexType>

  <xsd:simpleType name="DoxParamListKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="param" />
      <xsd:enumeration value="retval" />
      <xsd:enumeration value="exception" />
      <xsd:enumeration value="templateparam" />
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
