/*
  <xsd:simpleType name="DoxVirtualKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="non-virtual" />
      <xsd:enumeration value="virtual" />
      <xsd:enumeration value="pure-virtual" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxVirtualKind = 'non-virtual' | 'virtual' | 'pure-virtual';
