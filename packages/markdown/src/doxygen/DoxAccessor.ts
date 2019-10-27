/*
  <xsd:simpleType name="DoxAccessor">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="retain"/>
      <xsd:enumeration value="copy"/>
      <xsd:enumeration value="assign"/>
      <xsd:enumeration value="weak"/>
      <xsd:enumeration value="strong"/>
      <xsd:enumeration value="unretained"/>
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxAccessor =
  | 'retain'
  | 'copy'
  | 'assign'
  | 'weak'
  | 'strong'
  | 'unretained';
