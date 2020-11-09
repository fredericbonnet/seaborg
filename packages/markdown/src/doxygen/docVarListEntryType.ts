/*
  <xsd:complexType name="docVarListEntryType">
    <xsd:sequence>
      <xsd:element name="term" type="docTitleType" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { docTitleType } from '.';

const template = ({ text }: any) => `
<b>${text}</b>:
`;

const mappers = (): Mappers => ({
  term: docTitleType,
});

export default (element: Element) => {
  const text = applyToChildren(mappers())(element).join('').trim();
  return template({ text });
};
