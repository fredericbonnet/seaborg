/*
  <xsd:complexType name="docSect1Type" mixed="true">
    <xsd:sequence>
      <xsd:element name="title" type="xsd:string" minOccurs="0" />
      <xsd:choice maxOccurs="unbounded">
        <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
        <xsd:element name="internal" type="docInternalS1Type" minOccurs="0"  maxOccurs="unbounded" />
        <xsd:element name="sect2" type="docSect2Type" minOccurs="0" maxOccurs="unbounded" />
      </xsd:choice>
    </xsd:sequence>
    <xsd:attribute name="id" type="xsd:string" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { xsdString, textNode } from '../generic';
import { joinParagraphs } from '../helpers';
import { docParaType, docSect2Type } from '.';
import docInternalS1Type from './docInternalS1Type';

const mappers = (): Mappers => ({
  title: (title) => `## ${xsdString(title)}`,
  para: docParaType,
  internal: docInternalS1Type,
  sect2: docSect2Type,
  [$text]: textNode,
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element)).trim();
