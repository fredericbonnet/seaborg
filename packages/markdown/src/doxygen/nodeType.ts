/*
  <xsd:complexType name="nodeType">
    <xsd:sequence>
      <xsd:element name="label" />
      <xsd:element name="link" type="linkType" minOccurs="0" />
      <xsd:element name="childnode" type="childnodeType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
    <xsd:attribute name="id" type="xsd:string" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped } from '../mappers';
import { xsdString } from '../generic';
import { linkType, childnodeType } from '.';

const template = Handlebars.compile(
  `{{id}}{{#if label}}["{{label}}"]{{/if}}
{{#if link}}
{{./link}}
{{/if ~}}
{{#if childnode}}
{{#each childnode}}
{{this}}
{{/each}}{{~/if ~}}`,
  {
    noEscape: true,
  }
);

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
