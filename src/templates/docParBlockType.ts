/*
  <xsd:complexType name="docParBlockType">
    <xsd:sequence>
      <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { ElementTemplateMap, applyToChildren } from '.';

import docParaType from './docParaType';
import { Element } from '@rgrove/parse-xml';

const templates: ElementTemplateMap = {
  para: docParaType,
};
export default (element: Element) =>
  applyToChildren(templates)(element).join('\\\n');
