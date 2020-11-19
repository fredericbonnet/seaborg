/*
  <xsd:complexType name="docInternalS2Type" mixed="true">
    <xsd:sequence>
      <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="sect3" type="docSect3Type" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { joinParagraphs } from '../helpers';
import { docParaType, docSect3Type } from '.';

const mappers = (): Mappers => ({
  para: docParaType,
  sect3: docSect3Type,
  [$text]: textNode,
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element)).trim();
