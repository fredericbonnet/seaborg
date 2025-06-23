/*
  <xsd:simpleType name="MemberKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="define"/>
      <xsd:enumeration value="property"/>
      <xsd:enumeration value="event"/>
      <xsd:enumeration value="variable"/>
      <xsd:enumeration value="typedef"/>
      <xsd:enumeration value="enum"/>
      <xsd:enumeration value="enumvalue"/>
      <xsd:enumeration value="function"/>
      <xsd:enumeration value="signal"/>
      <xsd:enumeration value="prototype"/>
      <xsd:enumeration value="friend"/>
      <xsd:enumeration value="dcop"/>
      <xsd:enumeration value="slot"/>
    </xsd:restriction>
  </xsd:simpleType>
*/

export type MemberKind =
  | 'define'
  | 'property'
  | 'event'
  | 'variable'
  | 'typedef'
  | 'enum'
  | 'enumvalue'
  | 'function'
  | 'signal'
  | 'prototype'
  | 'friend'
  | 'dcop'
  | 'slot';
