/*
  <xsd:simpleType name="DoxImageKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="html" />
      <xsd:enumeration value="latex" />
      <xsd:enumeration value="docbook" />
      <xsd:enumeration value="rtf" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxImageKind = 'html' | 'latex' | 'docbook' | 'rtf';
