/*
  <xsd:complexType name="enumvalueType" mixed="true">
    <xsd:sequence>
      <xsd:element name="name" />
      <xsd:element name="initializer" type="linkedTextType" minOccurs="0" />
      <xsd:element name="briefdescription" type="descriptionType" minOccurs="0" />
      <xsd:element name="detaileddescription" type="descriptionType" minOccurs="0" />
    </xsd:sequence>
    <xsd:attribute name="id" type="xsd:string" />
    <xsd:attribute name="prot" type="DoxProtectionKind" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped, $default, applyToChildren } from '..';
import Handlebars from 'handlebars';

import xsdString from '../xsd-string';
import descriptionType from './descriptionType';
import linkedTextType from './linkedTextType';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
#### Enumerator {{md name}}

{{briefdescription}}

{{detaileddescription}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  name: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
});

//TODO other attributes
export default (element: Element) => {
  const {
    attributes: { id },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, id });
};

const defTemplate = Handlebars.compile(
  '{{name}}{{#if initializer}} {{initializer}}{{/if}}',
  { noEscape: true }
);

const defMappers = (): Mappers => ({
  name: xsdString,
  initializer: linkedTextType,
});

export function def(element: Element) {
  const context = applyToChildrenGrouped(defMappers())(element);
  return defTemplate(context);
}
