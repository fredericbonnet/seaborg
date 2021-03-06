/*
  <xsd:complexType name="docURLLink" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
    <xsd:attribute name="url" type="xsd:string" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { joinStrings } from '../helpers';
import { docTitleCmdGroup } from '.';

const mappers = (): Mappers => ({
  ...docTitleCmdGroup(),
  [$text]: textNode,
});

export default (element: Element) => {
  const {
    attributes: { url },
  } = element;
  const text = joinStrings(applyToChildren(mappers())(element));

  return `[${text}](${url})`;
};
