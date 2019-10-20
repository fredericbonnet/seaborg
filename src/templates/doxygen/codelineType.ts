/*
  <xsd:complexType name="codelineType">
    <xsd:sequence>
      <xsd:element name="highlight" type="highlightType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
    <xsd:attribute name="lineno" type="xsd:integer" />
    <xsd:attribute name="refid" type="xsd:string" />
    <xsd:attribute name="refkind" type="DoxRefKind" />
    <xsd:attribute name="external" type="DoxBool" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { highlightType } from '.';

const mappers = (): Mappers => ({
  highlight: highlightType,
});

// TODO attributes
export default (element: Element) =>
  applyToChildren(mappers())(element).join('');
