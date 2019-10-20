/*
  <xsd:complexType name="docURLLink" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
    <xsd:attribute name="url" type="xsd:string" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildren, $text } from '..';

import docTitleCmdGroup from './docTitleCmdGroup';
import textNode from '../textNode';

const mappers = (): Mappers => ({
  ...docTitleCmdGroup(),
  [$text]: textNode,
});

export default (element: Element) => {
  const {
    attributes: { url },
  } = element;
  const text = applyToChildren(mappers())(element).join('');

  return `[${text}](${url})`;
};
