/*
  <xsd:complexType name="docMarkupType" mixed="true">
    <xsd:group ref="docCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, $text, applyToChildren } from '../mappers';
import { textNode } from '../generic';
import { joinStrings } from '../helpers';
import { docCmdGroup } from '.';

const mappers = (): Mappers => ({
  ...docCmdGroup(),
  [$text]: textNode,
});

export default (element: Element) =>
  joinStrings(applyToChildren(mappers())(element));
