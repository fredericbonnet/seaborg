/*
  <xsd:complexType name="referenceType" mixed="true">
    <xsd:attribute name="refid" type="xsd:string" />
    <xsd:attribute name="compoundref" type="xsd:string" use="optional" />
    <xsd:attribute name="startline" type="xsd:integer" />
    <xsd:attribute name="endline" type="xsd:integer" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { joinStrings, md, ref } from '../helpers';

const mappers = (): Mappers => ({
  [$text]: textNode,
});

export default (element: Element) => {
  // TODO other attributes?
  const {
    attributes: { refid },
  } = element;
  const text = joinStrings(applyToChildren(mappers())(element));
  return ref(refid, 'member', md(text));
};
