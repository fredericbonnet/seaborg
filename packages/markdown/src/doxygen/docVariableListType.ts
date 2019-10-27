/*
  <xsd:complexType name="docVariableListType">
    <xsd:sequence>
      <xsd:group ref="docVariableListGroup" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { docVariableListGroup } from '.';

const mappers = (): Mappers => ({
  ...docVariableListGroup(),
});

export default (element: Element) =>
  applyToChildren(mappers())(element).join('\n\n');
