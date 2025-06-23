/*
  <xsd:complexType name="docListItemType">
    <xsd:sequence>
      <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
    <xsd:attribute name="override" type="DoxCheck" />
    <xsd:attribute name="value" type="xsd:integer" use="optional"/>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { joinParagraphs } from '../helpers';
import { docParaType } from '.';

const mappers = (): Mappers => ({
  para: docParaType,
});

// TODO attributes
export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element));
