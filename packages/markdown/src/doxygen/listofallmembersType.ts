/*
  <xsd:complexType name="listofallmembersType">
    <xsd:sequence>
      <xsd:element name="member" type="memberRefType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildren } from '../mappers';
import { memberRefType } from '.';

const template = Handlebars.compile(
  `
## Members

{{#each members}}
* {{this}}
{{/each}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  member: memberRefType,
});

export default (element: Element) => {
  const members = applyToChildren(mappers())(element);

  return template({ members });
};
