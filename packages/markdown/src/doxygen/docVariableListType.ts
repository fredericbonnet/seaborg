/*
  <xsd:complexType name="docVariableListType">
    <xsd:sequence>
      <xsd:group ref="docVariableListGroup" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { joinParagraphs } from '../helpers';
import { docVariableListGroup } from '.';

const mappers = (): Mappers => ({
  ...docVariableListGroup(),
});

export default (element: Element) =>
  joinParagraphs(applyToChildren(mappers())(element));
