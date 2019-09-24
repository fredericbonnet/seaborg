/*
  <xsd:complexType name="docParaType" mixed="true">
    <xsd:group ref="docCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { TemplateMap, $default, $text, applyToChildren } from '.';

import docCmdGroup from './docCmdGroup';
import textNode from './textNode';

const templates: TemplateMap = {
  [$default]: docCmdGroup,
  [$text]: textNode,
};

export default (element: Element) =>
  applyToChildren(templates)(element).join('\n');
