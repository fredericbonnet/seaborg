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
import { TemplateMap, applyToChildren, $text } from '.';

import xsdString from './xsd-string';
import docParaType from './docParaType';
import text from './textNode';

// TODO
const templates: TemplateMap = {
  title: title => `### ${xsdString(title)}`,
  para: docParaType,
  [$text]: text,
};

export default (element: Element) =>
  applyToChildren(templates)(element).join('\n\n');
