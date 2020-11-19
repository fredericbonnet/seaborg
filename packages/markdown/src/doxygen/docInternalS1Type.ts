/*
  <xsd:complexType name="docInternalS1Type" mixed="true">
    <xsd:sequence>
      <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="sect2" type="docSect2Type" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { joinParagraphs } from '../helpers';
import { docParaType, docSect2Type } from '.';

const mappers = (): Mappers => ({
  para: docParaType,
  sect2: docSect2Type,
  [$text]: textNode,
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element)).trim();
