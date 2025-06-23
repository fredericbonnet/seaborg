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
    <xsd:attribute ref="xml:lang" use="required"/>
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
    </xsd:sequence>
    ...
    <xsd:attribute name="language" type="DoxLanguage" use="optional"/>
    <xsd:attribute name="prot" type="DoxProtectionKind" />
    ...
  </xsd:complexType>
*/

export interface CompoundType {
  name: string;
  members: MemberType[];
  refid: string;
  kind: CompoundKind;

  language?: string;
  prot?: DoxProtectionKind;

  title?: string[];
  briefdescription?: string[];

  innerdir?: string[];
  innerfile?: string[];
  innerclass?: string[];
  innernamespace?: string[];
  innerpage?: string[];
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

  compound.xsd:
 
  <xsd:complexType name="memberdefType">
    ...
    <xsd:attribute name="prot" type="DoxProtectionKind" />
    ...
  </xsd:complexType>

  <xsd:complexType name="enumvalueType" mixed="true">
    ...
    <xsd:attribute name="prot" type="DoxProtectionKind" />
  </xsd:complexType>
*/

export interface MemberType {
  name?: string;
  refid: string;
  kind: MemberKind;

  prot?: DoxProtectionKind;
}

/*
  index.xsd:

  <xsd:simpleType name="CompoundKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="class"/>
      <xsd:enumeration value="struct"/>
      <xsd:enumeration value="union"/>
      <xsd:enumeration value="interface"/>
      <xsd:enumeration value="protocol"/>
      <xsd:enumeration value="category"/>
      <xsd:enumeration value="exception"/>
      <xsd:enumeration value="file"/>
      <xsd:enumeration value="namespace"/>
      <xsd:enumeration value="group"/>
      <xsd:enumeration value="page"/>
      <xsd:enumeration value="example"/>
      <xsd:enumeration value="dir"/>
      <xsd:enumeration value="type"/>
      <xsd:enumeration value="concept"/>
      <xsd:enumeration value="module"/>
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
  | 'dir'
  | 'type'
  | 'concept'
  | 'module';

/*
  index.xsd:

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

/*
  compound.xsd:

  <xsd:simpleType name="DoxProtectionKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="public" />
      <xsd:enumeration value="protected" />
      <xsd:enumeration value="private" />
      <xsd:enumeration value="package" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxProtectionKind = 'public' | 'protected' | 'private' | 'package';
