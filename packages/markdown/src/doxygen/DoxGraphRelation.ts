/*
  <xsd:simpleType name="DoxGraphRelation">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="include" />
      <xsd:enumeration value="usage" />
      <xsd:enumeration value="template-instance" />
      <xsd:enumeration value="public-inheritance" />
      <xsd:enumeration value="protected-inheritance" />
      <xsd:enumeration value="private-inheritance" />
      <xsd:enumeration value="type-constraint" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxGraphRelation =
  | 'include'
  | 'usage'
  | 'template-instance'
  | 'public-inheritance'
  | 'protected-inheritance'
  | 'private-inheritance'
  | 'type-constraint';
