/*
  <xsd:simpleType name="DoxSimpleSectKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="see" />
      <xsd:enumeration value="return" />
      <xsd:enumeration value="author" />
      <xsd:enumeration value="authors" />
      <xsd:enumeration value="version" />
      <xsd:enumeration value="since" />
      <xsd:enumeration value="date" />
      <xsd:enumeration value="note" />
      <xsd:enumeration value="warning" />
      <xsd:enumeration value="pre" />
      <xsd:enumeration value="post" />
      <xsd:enumeration value="copyright" />
      <xsd:enumeration value="invariant" />
      <xsd:enumeration value="remark" />
      <xsd:enumeration value="attention" />
      <xsd:enumeration value="par" />
      <xsd:enumeration value="rcs" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxSimpleSectKind =
  | 'see'
  | 'return'
  | 'author'
  | 'authors'
  | 'version'
  | 'since'
  | 'date'
  | 'note'
  | 'warning'
  | 'pre'
  | 'post'
  | 'copyright'
  | 'invariant'
  | 'remark'
  | 'attention'
  | 'par'
  | 'rcs';
