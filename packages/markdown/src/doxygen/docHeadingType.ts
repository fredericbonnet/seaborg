/*
  <xsd:complexType name="docHeadingType" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
    <xsd:attribute name="level" type="range_1_6" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { docTitleCmdGroup } from '.';

const mappers = (): Mappers => ({
  ...docTitleCmdGroup(),
  [$text]: textNode,
});

export default (element: Element) => {
  const {
    attributes: { level },
  } = element;
  const text = applyToChildren(mappers())(element);
  return `${'#'.repeat(parseInt(level))} ${text}`;
};
