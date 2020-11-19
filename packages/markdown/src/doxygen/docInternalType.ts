/*
  <xsd:complexType name="docInternalType" mixed="true">
    <xsd:sequence>
      <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="sect1" type="docSect1Type" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { joinParagraphs } from '../helpers';
import { docParaType, docSect1Type } from '.';

const mappers = (): Mappers => ({
  para: docParaType,
  sect1: docSect1Type,
  [$text]: textNode,
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element)).trim();
