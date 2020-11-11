/*
  <xsd:complexType name="docParamName" mixed="true">
    <xsd:sequence>
      <xsd:element name="ref" type="refTextType" minOccurs="0" maxOccurs="1" />
    </xsd:sequence>
    <xsd:attribute name="direction" type="DoxParamDir" use="optional" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { joinStrings } from '../helpers';
import { refTextType } from '.';

const mappers = (): Mappers => ({
  ref: refTextType,
  [$text]: textNode,
});

// TODO direction attribute
export default (element: Element) =>
  joinStrings(applyToChildren(mappers())(element));
