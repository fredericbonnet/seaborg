/*
  <xsd:complexType name="highlightType" mixed="true">
    <xsd:choice minOccurs="0" maxOccurs="unbounded">
      <xsd:element name="sp" type="spType" />
      <xsd:element name="ref" type="refTextType" />
    </xsd:choice>
    <xsd:attribute name="class" type="DoxHighlightClass" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { xsdString, textNode } from '../generic';
import { joinStrings } from '../helpers';
import { spType } from '.';

const mappers = (): Mappers => ({
  sp: spType,
  ref: xsdString,
  [$text]: textNode,
});

// TODO class attribute
export default (element: Element) =>
  joinStrings(applyToChildren(mappers())(element));
