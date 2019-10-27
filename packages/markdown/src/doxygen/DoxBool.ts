/*
  <xsd:simpleType name="DoxBool">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="yes" />
      <xsd:enumeration value="no" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxBool = 'yes' | 'no';
