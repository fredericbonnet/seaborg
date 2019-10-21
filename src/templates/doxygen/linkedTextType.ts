/*
  <xsd:complexType name="linkedTextType" mixed="true">
    <xsd:sequence>
    <xsd:element name="ref" type="refTextType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { refTextType } from '.';

const mappers = (): Mappers => ({
  ref: refTextType,
  [$text]: textNode,
});

export default (element: Element) =>
  applyToChildren(mappers())(element).join('');
