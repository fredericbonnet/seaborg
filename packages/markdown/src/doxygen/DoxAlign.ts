/*
  <xsd:simpleType name="DoxAlign">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="left"/>
      <xsd:enumeration value="right"/>
      <xsd:enumeration value="center"/>
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxAlign = 'left' | 'right' | 'center';
