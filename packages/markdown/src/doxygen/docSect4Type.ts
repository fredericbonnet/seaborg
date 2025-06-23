/*
  <xsd:complexType name="docSect4Type" mixed="true">
    <xsd:sequence>
      <xsd:element name="title" type="docTitleType" minOccurs="0" />
      <xsd:choice maxOccurs="unbounded">
        <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
        <xsd:element name="sect5" type="docSect5Type" minOccurs="0" maxOccurs="unbounded" />
        <xsd:element name="internal" type="docInternalS4Type" minOccurs="0" />
      </xsd:choice>
    </xsd:sequence>
    <xsd:attribute name="id" type="xsd:string" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text, $default } from '../mappers';
import { textNode } from '../generic';
import { joinParagraphs } from '../helpers';
import { docTitleType } from '.';
import { docParaType } from '.';
import docInternalS4Type from './docInternalS4Type';

const mappers = (): Mappers => ({
  title: (title) => `##### ${docTitleType(title)}`,
  para: docParaType,
  internal: docInternalS4Type,
  [$text]: textNode,
  // TODO
  [$default]: (element) => element.name + ' ' + JSON.stringify(element),
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element)).trim();
