/*
  <xsd:complexType name="docTitleType" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildren, $default } from '.';

import docTitleCmdGroup from './docTitleCmdGroup';

const templates: TemplateMap = {
  [$default]: docTitleCmdGroup,
};

export default (element: Element) =>
  applyToChildren(templates)(element).join('\n');
