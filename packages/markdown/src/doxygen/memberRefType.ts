/*
  <xsd:complexType name="memberRefType">
    <xsd:sequence>
      <xsd:element name="scope" />
      <xsd:element name="name" />
    </xsd:sequence>
    <xsd:attribute name="refid" type="xsd:string" />
    <xsd:attribute name="prot" type="DoxProtectionKind" />
    <xsd:attribute name="virt" type="DoxVirtualKind" />
    <xsd:attribute name="ambiguityscope" type="xsd:string" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped } from '../mappers';
import { xsdString } from '../generic';
import { md, ref } from '../helpers';

const template = ({ refid, name }: any) => ref(refid, 'member', md(name));

const mappers = (): Mappers => ({
  scope: xsdString,
  name: xsdString,
});

export default (element: Element) => {
  // TODO other attributes
  const {
    attributes: { refid },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, refid });
};
