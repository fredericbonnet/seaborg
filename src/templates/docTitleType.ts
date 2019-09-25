/*
  <xsd:complexType name="docTitleType" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildren, $default } from '.';

import docTitleCmdGroup from './docTitleCmdGroup';

const mappers: Mappers = {
  [$default]: docTitleCmdGroup,
};

export default (element: Element) =>
  applyToChildren(mappers)(element).join('\n');
