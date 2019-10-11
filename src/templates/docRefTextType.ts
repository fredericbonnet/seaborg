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
import { Mappers, applyToChildren, $default, $text } from '.';
import Handlebars from 'handlebars';

import docTitleCmdGroup from './docTitleCmdGroup';
import textNode from './textNode';

const template = Handlebars.compile('{{ref refid kindref text}}', {
  noEscape: true,
});

const mappers = (): Mappers => ({
  [$default]: docTitleCmdGroup,
  [$text]: textNode,
});

export default (element: Element) => {
  // TODO other attributes?
  const {
    attributes: { refid, kindref },
  } = element;
  const text = applyToChildren(mappers())(element).join('');
  return template({ refid, kindref, text });
};
