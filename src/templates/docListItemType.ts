/*
  <xsd:complexType name="docListItemType">
    <xsd:sequence>
      <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildren } from '.';

import docParaType from './docParaType';

const mappers = (): Mappers => ({
  para: docParaType,
});

export default (element: Element) =>
  applyToChildren(mappers())(element).join('\n\n');
