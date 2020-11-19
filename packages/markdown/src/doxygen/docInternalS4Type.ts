/*
  <xsd:complexType name="docInternalS4Type" mixed="true">
    <xsd:sequence>
      <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { joinParagraphs } from '../helpers';
import { docParaType } from '.';

const mappers = (): Mappers => ({
  para: docParaType,
  [$text]: textNode,
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element)).trim();
