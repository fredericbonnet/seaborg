/*
  <xsd:complexType name="docParamType" mixed="true">
    <xsd:sequence>
      <xsd:element name="ref" type="refTextType" minOccurs="0" maxOccurs="1" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildren, $text } from '.';

import refTextType from './refTextType';
import textNode from './textNode';

const mappers = (): Mappers => ({
  ref: refTextType,
  [$text]: textNode,
});

export default (element: Element) =>
  applyToChildren(mappers())(element).join('');