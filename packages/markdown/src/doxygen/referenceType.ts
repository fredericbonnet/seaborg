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
import { mdHelper, refHelper } from '../helpers';

const template = ({ refid, text }: any) =>
  refHelper(refid, 'member', mdHelper(text));

const mappers = (): Mappers => ({
  [$text]: textNode,
});

export default (element: Element) => {
  // TODO other attributes?
  const {
    attributes: { refid },
  } = element;
  const text = applyToChildren(mappers())(element).join('');
  return template({ refid, text });
};
