/*
  <xsd:simpleType name="DoxHighlightClass">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="comment" />
      <xsd:enumeration value="normal" />
      <xsd:enumeration value="preprocessor" />
      <xsd:enumeration value="keyword" />
      <xsd:enumeration value="keywordtype" />
      <xsd:enumeration value="keywordflow" />
      <xsd:enumeration value="stringliteral" />
      <xsd:enumeration value="charliteral" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxHighlightClass =
  | 'comment'
  | 'normal'
  | 'preprocessor'
  | 'keyword'
  | 'keywordtype'
  | 'keywordflow'
  | 'stringliteral'
  | 'charliteral';
