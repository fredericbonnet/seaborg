/*
  <xsd:complexType name="docParBlockType">
    <xsd:sequence>
      <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Mappers, applyToChildren } from '.';

import docParaType from './docParaType';
import { Element } from '@rgrove/parse-xml';

const mappers = (): Mappers => ({
  para: docParaType,
});

export default (element: Element) =>
  applyToChildren(mappers())(element).join('\\\n');
