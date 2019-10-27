/*

  <xsd:simpleType name="DoxCompoundKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="class" />
      <xsd:enumeration value="struct" />
      <xsd:enumeration value="union" />
      <xsd:enumeration value="interface" />
      <xsd:enumeration value="protocol" />
      <xsd:enumeration value="category" />
      <xsd:enumeration value="exception" />
      <xsd:enumeration value="service" />
      <xsd:enumeration value="singleton" />
      <xsd:enumeration value="module" />
      <xsd:enumeration value="type" />
      <xsd:enumeration value="file" />
      <xsd:enumeration value="namespace" />
      <xsd:enumeration value="group" />
      <xsd:enumeration value="page" />
      <xsd:enumeration value="example" />
      <xsd:enumeration value="dir" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxCompoundKind =
  | 'class'
  | 'struct'
  | 'union'
  | 'interface'
  | 'protocol'
  | 'category'
  | 'exception'
  | 'service'
  | 'singleton'
  | 'module'
  | 'type'
  | 'file'
  | 'namespace'
  | 'group'
  | 'page'
  | 'example'
  | 'dir';
