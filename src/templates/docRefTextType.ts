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
import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildren, $default, $text } from '.';

import docTitleCmdGroup from './docTitleCmdGroup';
import text from './textNode';

const templates: TemplateMap = {
  [$default]: docTitleCmdGroup,
  [$text]: text,
};

export default (element: Element) => {
  // TODO other attributes?
  const {
    attributes: { refid, kindref },
  } = element;
  const text = applyToChildren(templates)(element).join('');

  switch (kindref) {
    case 'compound':
      return `[${text}](./tmp/${refid})`; //FIXME link to compound
    case 'member':
      return `[${text}](#${refid})`; //FIXME link to member
  }
};
