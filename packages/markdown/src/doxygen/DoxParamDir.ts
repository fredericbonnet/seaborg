/*
  <xsd:simpleType name="DoxParamDir">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="in"/>
      <xsd:enumeration value="out"/>
      <xsd:enumeration value="inout"/>
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxParamDir = 'in' | 'out' | 'inout';
