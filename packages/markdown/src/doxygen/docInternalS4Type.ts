/*
  <xsd:complexType name="docInternalS4Type" mixed="true">
    <xsd:sequence>
      <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="sect5" type="docSect5Type" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text, $default } from '../mappers';
import { textNode } from '../generic';
import { joinParagraphs } from '../helpers';
import { docParaType } from '.';

const mappers = (): Mappers => ({
  para: docParaType,
  [$text]: textNode,
  // TODO
  [$default]: (element) => element.name + ' ' + JSON.stringify(element),
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element)).trim();
