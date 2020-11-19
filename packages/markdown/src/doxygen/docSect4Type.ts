/*
  <xsd:complexType name="docSect4Type" mixed="true">
    <xsd:sequence>
      <xsd:element name="title" type="xsd:string" />
      <xsd:choice maxOccurs="unbounded">
        <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
        <xsd:element name="internal" type="docInternalS4Type" minOccurs="0" />
      </xsd:choice>
    </xsd:sequence>
    <xsd:attribute name="id" type="xsd:string" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { xsdString, textNode } from '../generic';
import { joinParagraphs } from '../helpers';
import { docParaType } from '.';
import docInternalS4Type from './docInternalS4Type';

const mappers = (): Mappers => ({
  title: (title) => `##### ${xsdString(title)}`,
  para: docParaType,
  internal: docInternalS4Type,
  [$text]: textNode,
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element)).trim();
