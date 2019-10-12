/*
  <xsd:complexType name="docParaType" mixed="true">
    <xsd:group ref="docCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, $text, applyToChildren } from '.';

import docCmdGroup from './docCmdGroup';
import textNode from './textNode';

const mappers = (): Mappers => ({
  ...docCmdGroup(),
  [$text]: textNode,
});

export default (element: Element) =>
  applyToChildren(mappers())(element).join('');
