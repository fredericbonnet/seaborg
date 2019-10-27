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

export const labels: { [key: string]: string } = {
  define: 'Macro',
  property: 'Property',
  event: 'Event',
  variable: 'Variable',
  typedef: 'Typedef',
  enum: 'Enumeration type',
  function: 'Function',
  signal: 'Signal',
  prototype: 'Prototype',
  friend: 'Friend',
  // dcop: 'dcop', //TODO
  slot: 'Slot',
  interface: 'Interface',
  service: 'Service',
};

export const plurals: { [key: string]: string } = {
  define: 'Macros',
  property: 'Properties',
  event: 'Events',
  variable: 'Variables',
  typedef: 'Typedefs',
  enum: 'Enumeration types',
  function: 'Functions',
  signal: 'Signals',
  prototype: 'Prototypes',
  friend: 'Friends',
  // dcop: 'dcop', //TODO
  slot: 'Slots',
  interface: 'Interfaces',
  service: 'Services',
};
