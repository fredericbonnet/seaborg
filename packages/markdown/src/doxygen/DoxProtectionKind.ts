/*
  <xsd:simpleType name="DoxProtectionKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="public" />
      <xsd:enumeration value="protected" />
      <xsd:enumeration value="private" />
      <xsd:enumeration value="package" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxProtectionKind = 'public' | 'protected' | 'private' | 'package';
