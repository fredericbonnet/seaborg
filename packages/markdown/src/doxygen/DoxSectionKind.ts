/*
  <xsd:simpleType name="DoxSectionKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="user-defined" />
      <xsd:enumeration value="public-type" />
      <xsd:enumeration value="public-func" />
      <xsd:enumeration value="public-attrib" />
      <xsd:enumeration value="public-slot" />
      <xsd:enumeration value="signal" />
      <xsd:enumeration value="dcop-func" />
      <xsd:enumeration value="property" />
      <xsd:enumeration value="event" />
      <xsd:enumeration value="public-static-func" />
      <xsd:enumeration value="public-static-attrib" />
      <xsd:enumeration value="protected-type" />
      <xsd:enumeration value="protected-func" />
      <xsd:enumeration value="protected-attrib" />
      <xsd:enumeration value="protected-slot" />
      <xsd:enumeration value="protected-static-func" />
      <xsd:enumeration value="protected-static-attrib" />
      <xsd:enumeration value="package-type" />
      <xsd:enumeration value="package-func" />
      <xsd:enumeration value="package-attrib" />
      <xsd:enumeration value="package-static-func" />
      <xsd:enumeration value="package-static-attrib" />
      <xsd:enumeration value="private-type" />
      <xsd:enumeration value="private-func" />
      <xsd:enumeration value="private-attrib" />
      <xsd:enumeration value="private-slot" />
      <xsd:enumeration value="private-static-func" />
      <xsd:enumeration value="private-static-attrib" />
      <xsd:enumeration value="friend" />
      <xsd:enumeration value="related" />
      <xsd:enumeration value="define" />
      <xsd:enumeration value="prototype" />
      <xsd:enumeration value="typedef" />
      <xsd:enumeration value="enum" />
      <xsd:enumeration value="func" />
      <xsd:enumeration value="var" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxSectionKind =
  | 'user-defined'
  | 'public-type'
  | 'public-func'
  | 'public-attrib'
  | 'public-slot'
  | 'signal'
  | 'dcop-func'
  | 'property'
  | 'event'
  | 'public-static-func'
  | 'public-static-attrib'
  | 'protected-type'
  | 'protected-func'
  | 'protected-attrib'
  | 'protected-slot'
  | 'protected-static-func'
  | 'protected-static-attrib'
  | 'package-type'
  | 'package-func'
  | 'package-attrib'
  | 'package-static-func'
  | 'package-static-attrib'
  | 'private-type'
  | 'private-func'
  | 'private-attrib'
  | 'private-slot'
  | 'private-static-func'
  | 'private-static-attrib'
  | 'friend'
  | 'related'
  | 'define'
  | 'prototype'
  | 'typedef'
  | 'enum'
  | 'func'
  | 'var';

export const labels: { [key: string]: string } = {
  //   'user-defined': 'TODO',
  'public-type': 'Public types',
  'public-func': 'Public functions',
  'public-attrib': 'Public attributes',
  'public-slot': 'Public slots',
  signal: 'Signals',
  //   'dcop-func': 'TODO',
  property: 'Properties',
  event: 'Events',
  'public-static-func': 'Public static functions',
  'public-static-attrib': 'Public static attributes',
  'protected-type': 'Protected types',
  'protected-func': 'Protected functions',
  'protected-attrib': 'Protected attributes',
  'protected-slot': 'Protected slots',
  'protected-static-func': 'Protected static functions',
  'protected-static-attrib': 'Protected static attributes',
  'package-type': 'Package types',
  'package-func': 'Package functions',
  'package-attrib': 'Package attributes',
  'package-static-func': 'Package static functions',
  'package-static-attrib': 'Package static attributes',
  'private-type': 'Private types',
  'private-func': 'Private functions',
  'private-attrib': 'Private attributes',
  'private-slot': 'Private slots',
  'private-static-func': 'Private static functions',
  'private-static-attrib': 'Private static attributes',
  friend: 'Friends',
  related: 'Related',
  define: 'Macros',
  prototype: 'Prototypes',
  typedef: 'Typedefs',
  enum: 'Enumeration types',
  func: 'Functions',
  var: 'Variables',
};
