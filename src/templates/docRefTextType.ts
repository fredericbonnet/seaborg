/*
  <xsd:complexType name="docRefTextType" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
    <xsd:attribute name="refid" type="xsd:string" />
    <xsd:attribute name="kindref" type="DoxRefKind" />
    <xsd:attribute name="external" type="xsd:string" />
  </xsd:complexType>

  <xsd:simpleType name="DoxRefKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="compound" />
      <xsd:enumeration value="member" />
    </xsd:restriction>
  </xsd:simpleType>
  */

//TODO
import { NodeBase, Element, Text } from '@rgrove/parse-xml';

import docTitleCmdGroup from './docTitleCmdGroup';

export default (element: Element) => {
  // TODO other attributes?
  const {
    attributes: { refid, kindref },
  } = element;

  const text = element.children
    .filter((node: NodeBase) => node.type === 'text' || node.type === 'element')
    .map((node: NodeBase) => {
      switch (node.type) {
        case 'text':
          return (node as Text).text;
        case 'element':
          return docTitleCmdGroup(node as Element);
      }
    })
    .join('');

  switch (kindref) {
    case 'compound':
      return `[${text}](./tmp/${refid})`; //FIXME link to compound
    case 'member':
      return `[${text}](#${refid})`; //FIXME link to member
    default:
      return 'TODO'; // CANTHAPPEN
  }
};
