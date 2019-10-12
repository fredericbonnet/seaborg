/*
  <xsd:complexType name="docTitleType" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildren, $text } from '.';

import docTitleCmdGroup from './docTitleCmdGroup';
import textNode from './textNode';

const mappers = (): Mappers => ({
  ...docTitleCmdGroup(),
  [$text]: textNode,
});

export default (element: Element) =>
  applyToChildren(mappers())(element).join('');
