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
      <xsd:enumeration value="concept" />
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
  | 'dir'
  | 'concept';

export const labels: { [key: string]: string } = {
  class: 'Class',
  struct: 'Structure',
  union: 'Union',
  interface: 'Interface',
  protocol: 'Protocol',
  category: 'Category',
  exception: 'Exception',
  service: 'Service',
  singleton: 'Singleton',
  module: 'Module',
  type: 'Type',
  file: 'File',
  namespace: 'Namespace',
  group: 'Module', //FIXME conflict with module
  page: 'Page',
  example: 'Example',
  dir: 'Directory',
  concept: 'Concept',
};

export const plurals: { [key: string]: string } = {
  class: 'Classes',
  struct: 'Structures',
  union: 'Unions',
  interface: 'Interfaces',
  protocol: 'Protocols',
  category: 'Categories',
  exception: 'Exceptions',
  service: 'Services',
  singleton: 'Singletons',
  module: 'Modules',
  type: 'Types',
  file: 'Files',
  namespace: 'Namespaces',
  group: 'Modules', //FIXME conflict with module
  page: 'Pages',
  example: 'Examples',
  dir: 'Directories',
  concept: 'Concepts',
};
