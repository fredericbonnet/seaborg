/*
  <xsd:complexType name="docTitleType" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildren, $default, $text } from '.';

import docTitleCmdGroup from './docTitleCmdGroup';
import textNode from './textNode';

const mappers = (): Mappers => ({
  [$default]: docTitleCmdGroup,
  [$text]: textNode,
});

export default (element: Element) =>
  applyToChildren(mappers())(element).join('\n');
