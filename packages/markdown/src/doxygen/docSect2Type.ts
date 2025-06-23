/*
  <xsd:complexType name="docSect2Type" mixed="true">
    <xsd:sequence>
      <xsd:element name="title" type="docTitleType" minOccurs="0" />
      <xsd:choice maxOccurs="unbounded">
        <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
        <xsd:element name="sect3" type="docSect3Type" minOccurs="0" maxOccurs="unbounded" />
        <xsd:element name="internal" type="docInternalS2Type" minOccurs="0" />
      </xsd:choice>
    </xsd:sequence>
    <xsd:attribute name="id" type="xsd:string" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { joinParagraphs } from '../helpers';
import { docTitleType } from '.';
import { docParaType } from '.';
import docSect3Type from './docSect3Type';
import docInternalS2Type from './docInternalS2Type';

const mappers = (): Mappers => ({
  title: (title) => `### ${docTitleType(title)}`,
  para: docParaType,
  sect3: docSect3Type,
  internal: docInternalS2Type,
  [$text]: textNode,
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element)).trim();
