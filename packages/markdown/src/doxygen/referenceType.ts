/*
  <xsd:complexType name="referenceType" mixed="true">
    <xsd:attribute name="refid" type="xsd:string" />
    <xsd:attribute name="compoundref" type="xsd:string" use="optional" />
    <xsd:attribute name="startline" type="xsd:integer" />
    <xsd:attribute name="endline" type="xsd:integer" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';

const template = Handlebars.compile('{{ref refid kindref text}}', {
  noEscape: true,
});

const mappers = (): Mappers => ({
  [$text]: textNode,
});

export default (element: Element) => {
  const {
    attributes: { refid, compoundref },
  } = element;
  const text = applyToChildren(mappers())(element).join('');
  return template({ refid, kindref: 'member', text });
};
