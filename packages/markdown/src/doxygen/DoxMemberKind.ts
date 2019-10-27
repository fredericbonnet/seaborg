/*

  <xsd:simpleType name="DoxMemberKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="define" />
      <xsd:enumeration value="property" />
      <xsd:enumeration value="event" />
      <xsd:enumeration value="variable" />
      <xsd:enumeration value="typedef" />
      <xsd:enumeration value="enum" />
      <xsd:enumeration value="function" />
      <xsd:enumeration value="signal" />
      <xsd:enumeration value="prototype" />
      <xsd:enumeration value="friend" />
      <xsd:enumeration value="dcop" />
      <xsd:enumeration value="slot" />
      <xsd:enumeration value="interface" />
      <xsd:enumeration value="service" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxMemberKind =
  | 'define'
  | 'property'
  | 'event'
  | 'variable'
  | 'typedef'
  | 'enum'
  | 'function'
  | 'signal'
  | 'prototype'
  | 'friend'
  | 'dcop'
  | 'slot'
  | 'interface'
  | 'service';
