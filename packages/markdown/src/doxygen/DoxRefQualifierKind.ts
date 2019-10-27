/*
  <xsd:simpleType name="DoxRefQualifierKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="lvalue" />
      <xsd:enumeration value="rvalue" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxRefQualifierKind = 'lvalue' | 'rvalue';
