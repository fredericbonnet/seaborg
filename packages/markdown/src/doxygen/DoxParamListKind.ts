/*
  <xsd:simpleType name="DoxParamListKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="param" />
      <xsd:enumeration value="retval" />
      <xsd:enumeration value="exception" />
      <xsd:enumeration value="templateparam" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxParamListKind =
  | 'param'
  | 'retval'
  | 'exception'
  | 'templateparam';
