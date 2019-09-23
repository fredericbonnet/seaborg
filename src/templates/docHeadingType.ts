/*
  <xsd:complexType name="docHeadingType" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
    <xsd:attribute name="level" type="xsd:integer" /> <!-- todo: range 1-6 -->
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildren, $default, $text } from '.';

import docTitleCmdGroup from './docTitleCmdGroup';
import textNode from './textNode';

const templates: TemplateMap = {
  [$default]: docTitleCmdGroup,
  [$text]: textNode,
};

export default (element: Element) => {
  const {
    attributes: { level },
  } = element;
  const text = applyToChildren(templates)(element);
  return `${'#'.repeat(parseInt(level))} ${text}`;
};
