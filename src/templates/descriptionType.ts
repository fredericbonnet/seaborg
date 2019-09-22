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
import { ElementTemplateMap, applyToChildren } from '.';

import xsdString from './xsd-string';
import docParaType from './docParaType';

// TODO
const templates: ElementTemplateMap = {
  title: title => `### ${xsdString(title)}`,
  para: docParaType,
};

export default (description: Element) =>
  applyToChildren(templates)(description).join('\n\n');
