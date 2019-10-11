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
import { Mappers, applyToChildrenGrouped, $default } from '.';
import Handlebars from 'handlebars';

import linkedTextType from './linkedTextType';
import xsdString from './xsd-string';
import descriptionType from './descriptionType';

const template = Handlebars.compile(
  `
  {{~#if defname}}{{defname}}{{/if ~}}
  {{~#if type}}**{{type}}{{#if declname}} {{declname}}{{/if}}**{{#if briefdescription}}: {{briefdescription}}{{/if}}{{/if ~}}
  {{~TODO TODO ~}}
  `,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  type: linkedTextType,
  declname: xsdString,
  defname: xsdString,
  briefdescription: descriptionType,
  //TODO
  [$default]: element => element.name + ' ' + JSON.stringify(element),
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, TODO: context[$default] });
};
