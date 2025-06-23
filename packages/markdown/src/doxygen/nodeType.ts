/*
  <xsd:complexType name="nodeType">
    <xsd:sequence>
      <xsd:element name="label" type="xsd:string" />
      <xsd:element name="link" type="linkType" minOccurs="0" />
      <xsd:element name="childnode" type="childnodeType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
    <xsd:attribute name="id" type="xsd:string" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped } from '../mappers';
import { xsdString } from '../generic';
import { linkType, childnodeType } from '.';

const template = ({ id, label, link, childnode }: any) =>
  `${id}${label ? `["${label}"]` : ''}\n` +
  (link ? `${link}\n` : '') +
  (childnode ? childnode.join('\n') + '\n' : '');

const mappers = (reverse: boolean): Mappers => ({
  label: xsdString,
  link: linkType,
  childnode: childnodeType(reverse),
});

export default (reverse: boolean) => (element: Element) => {
  const {
    attributes: { id },
  } = element;
  const context = applyToChildrenGrouped(mappers(reverse))(element);

  return template({ ...context, id });
};
