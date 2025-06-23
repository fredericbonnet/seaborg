/*
  <xsd:complexType name="docSect3Type" mixed="true">
    <xsd:sequence>
      <xsd:element name="title" type="docTitleType" minOccurs="0" />
      <xsd:choice maxOccurs="unbounded">
        <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
        <xsd:element name="sect4" type="docSect4Type" minOccurs="0" maxOccurs="unbounded" />
        <xsd:element name="internal" type="docInternalS3Type" minOccurs="0" />
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
import docSect4Type from './docSect4Type';
import docInternalS3Type from './docInternalS3Type';

const mappers = (): Mappers => ({
  title: (title) => `#### ${docTitleType(title)}`,
  para: docParaType,
  sect4: docSect4Type,
  internal: docInternalS3Type,
  [$text]: textNode,
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element)).trim();
