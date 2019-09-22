/*
  <xsd:complexType name="docParaType" mixed="true">
    <xsd:group ref="docCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { NodeBase, Element, Text } from '@rgrove/parse-xml';
import { TemplateMap, $default, $text, applyToChildren } from '.';

import docCmdGroup from './docCmdGroup';
import text from './textNode';

const templates: TemplateMap = {
  [$default]: docCmdGroup,
  [$text]: text,
};

export default (element: Element) =>
  applyToChildren(templates)(element).join('\n');
