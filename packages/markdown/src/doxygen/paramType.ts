/*
  <xsd:complexType name="paramType">
    <xsd:sequence>
      <xsd:element name="type" type="linkedTextType" minOccurs="0" />
      <xsd:element name="declname" minOccurs="0" />
      <xsd:element name="defname" minOccurs="0" />
      <xsd:element name="array" minOccurs="0" />
      <xsd:element name="defval" type="linkedTextType" minOccurs="0" />
      <xsd:element name="typeconstraint" type="linkedTextType" minOccurs="0" />
      <xsd:element name="briefdescription" type="descriptionType" minOccurs="0" />
    </xsd:sequence>
  </xsd:complexType>
*/

// TODO
import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../mappers';
import { xsdString } from '../generic';
import { todo } from '../helpers';
import { linkedTextType, descriptionType } from '.';

const template = ({
  defname,
  type,
  attributes,
  declname,
  defval,
  briefdescription,
  TODO,
}: any) =>
  (defname ? defname : '') +
  (type
    ? (attributes ? `_${attributes}_ ` : '') +
      type +
      (declname ? ` **${declname}**` : '') +
      (defval ? ` = ${defval} ` : '') +
      (briefdescription ? `: ${briefdescription}` : '')
    : '') +
  (TODO ? todo(TODO) : '');

const mappers = (): Mappers => ({
  attributes: xsdString, // Missing from compound.xsd!
  type: linkedTextType,
  declname: xsdString,
  defname: xsdString,
  defval: linkedTextType,
  briefdescription: descriptionType,
  //TODO
  [$default]: (element) => element.name + ' ' + JSON.stringify(element),
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, TODO: context[$default] });
};
