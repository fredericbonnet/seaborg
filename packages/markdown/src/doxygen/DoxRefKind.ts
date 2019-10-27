/*
  <xsd:simpleType name="DoxRefKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="compound" />
      <xsd:enumeration value="member" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxRefKind = 'compound' | 'member';
