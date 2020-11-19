/*
  <xsd:complexType name="descriptionType" mixed="true">
    <xsd:sequence>
      <xsd:element name="title" type="xsd:string" minOccurs="0"/>	    
      <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="internal" type="docInternalType" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element name="sect1" type="docSect1Type" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text, $default } from '../mappers';
import { xsdString, textNode } from '../generic';
import { joinParagraphs } from '../helpers';
import { docInternalType, docParaType, docSect1Type } from '.';

const mappers = (): Mappers => ({
  title: (title) => `### ${xsdString(title)}`,
  para: docParaType,
  internal: docInternalType,
  sect1: docSect1Type,
  [$text]: textNode,
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element)).trim();
