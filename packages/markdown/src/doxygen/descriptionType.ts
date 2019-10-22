/*
  <xsd:complexType name="descriptionType" mixed="true">
    <xsd:sequence>
      <xsd:element name="title" type="xsd:string" minOccurs="0"/>	    
      <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="sect1" type="docSect1Type" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="internal" type="docInternalType" minOccurs="0" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { xsdString, textNode } from '../generic';
import { docParaType } from '.';

// TODO
const mappers = (): Mappers => ({
  title: title => `### ${xsdString(title)}`,
  para: docParaType,
  [$text]: textNode,
});

export default (element: Element) =>
  applyToChildren(mappers())(element)
    .join('\n\n')
    .trim();
