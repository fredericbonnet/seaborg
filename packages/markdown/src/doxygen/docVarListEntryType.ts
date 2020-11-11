/*
  <xsd:complexType name="docVarListEntryType">
    <xsd:sequence>
      <xsd:element name="term" type="docTitleType" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { joinStrings } from '../helpers';
import { docTitleType } from '.';

const mappers = (): Mappers => ({
  term: docTitleType,
});

export default (element: Element) => {
  const text = joinStrings(applyToChildren(mappers())(element)).trim();
  return `<b>${text}</b>:`;
};
