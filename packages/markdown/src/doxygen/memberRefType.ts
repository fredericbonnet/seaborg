/*
  <xsd:complexType name="memberRefType">
    <xsd:sequence>
      <xsd:element name="scope" type="xsd:string" />
      <xsd:element name="name" type="xsd:string" />
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

const mappers = (): Mappers => ({
  scope: xsdString,
  name: xsdString,
});

export default (element: Element) => {
  // TODO other attributes
  const {
    attributes: { refid },
  } = element;
  const { name } = applyToChildrenGrouped(mappers())(element);

  return ref(refid, 'member', md(name));
};
