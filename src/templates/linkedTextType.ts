/*
  <xsd:complexType name="linkedTextType" mixed="true">
    <xsd:sequence>
    <xsd:element name="ref" type="refTextType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildren, $text } from '.';

import refTextType from './refTextType';
import { text } from './textNode';

const mappers = (): Mappers => ({
  ref: refTextType,
  [$text]: text,
});

export default (element: Element) =>
  applyToChildren(mappers())(element).join('');
