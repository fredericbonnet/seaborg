/*
  <xsd:complexType name="refTextType">
    <xsd:simpleContent>
      <xsd:extension base="xsd:string">
       <xsd:attribute name="refid" type="xsd:string" />
       <xsd:attribute name="kindref" type="DoxRefKind" />
       <xsd:attribute name="external" type="xsd:string" use="optional"/>
       <xsd:attribute name="tooltip" type="xsd:string" use="optional"/>
      </xsd:extension>
    </xsd:simpleContent>
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
import { Mappers, applyToChildren, $text } from '.';
import Handlebars from 'handlebars';

import textNode from './textNode';

const template = Handlebars.compile('{{ref refid kindref text}}', {
  noEscape: true,
});

const mappers = (): Mappers => ({
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
