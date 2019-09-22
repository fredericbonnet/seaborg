/*
  <xsd:complexType name="docURLLink" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
    <xsd:attribute name="url" type="xsd:string" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildren, $default, $text } from '.';

import docTitleCmdGroup from './docTitleCmdGroup';
import text from './textNode';

const templates: TemplateMap = {
  [$default]: docTitleCmdGroup,
  [$text]: text,
};

export default (element: Element) => {
  const {
    attributes: { url },
  } = element;
  const text = applyToChildren(templates)(element).join('');

  return `[${text}](${url})`;
};
