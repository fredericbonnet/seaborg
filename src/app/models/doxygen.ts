/*
 * Adapted from index.xsd and compound.xsd
 */

/*
  index.xsd:

  <xsd:complexType name="DoxygenType">
    <xsd:sequence>
      <xsd:element name="compound" type="CompoundType" minOccurs="0" maxOccurs="unbounded"/>
    </xsd:sequence>
    <xsd:attribute name="version" type="xsd:string" use="required"/>
  </xsd:complexType>
*/

export interface DoxygenType {
  compounds: CompoundType[];
  version: string;
}

/*
  index.xsd:

  <xsd:complexType name="CompoundType">
    <xsd:sequence>
      <xsd:element name="name" type="xsd:string"/>
      <xsd:element name="member" type="MemberType" minOccurs="0" maxOccurs="unbounded"/>
    </xsd:sequence>
    <xsd:attribute name="refid" type="xsd:string" use="required"/>
    <xsd:attribute name="kind" type="CompoundKind" use="required"/>
  </xsd:complexType>

  compound.xsd:
  
  <xsd:complexType name="compounddefType">
    <xsd:sequence>
    ...
      <xsd:element name="title" type="xsd:string" minOccurs="0" />
    ...
      <xsd:element name="briefdescription" type="descriptionType" minOccurs="0" />
    ...
  </xsd:complexType>
*/

export interface CompoundType {
  name: string;
  members: MemberType[];
  refid: string;
  kind: CompoundKind;

  title?: string[];
  briefdescription?: string[];
  innergroup?: string[];
}

/*
  index.xsd:

  <xsd:complexType name="MemberType">
    <xsd:sequence>
      <xsd:element name="name" type="xsd:string"/>
    </xsd:sequence>
    <xsd:attribute name="refid" type="xsd:string" use="required"/>
    <xsd:attribute name="kind" type="MemberKind" use="required"/>
  </xsd:complexType>
*/

export interface MemberType {
  name?: string;
  refid: string;
  kind: MemberKind;
}

/*
  index.xsd:

  <xsd:simpleType name="CompoundKind">
    <xsd:restriction base="xsd:string">
      |"class"
      |"struct"
      |"union"
      |"interface"
      |"protocol"
      |"category"
      |"exception"
      |"file"
      |"namespace"
      |"group"
      |"page"
      |"example"
      |"dir"
    </xsd:restriction>
  </xsd:simpleType>
*/

export type CompoundKind =
  | 'class'
  | 'struct'
  | 'union'
  | 'interface'
  | 'protocol'
  | 'category'
  | 'exception'
  | 'file'
  | 'namespace'
  | 'group'
  | 'page'
  | 'example'
  | 'dir';

/*
  index.xsd:

  <xsd:simpleType name="MemberKind">
    <xsd:restriction base="xsd:string">
      |"define"
      |"property"
      |"event"
      |"variable"
      |"typedef"
      |"enum"
      |"enumvalue"
      |"function"
      |"signal"
      |"prototype"
      |"friend"
      |"dcop"
      |"slot"
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
