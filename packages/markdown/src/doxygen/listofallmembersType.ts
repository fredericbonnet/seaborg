/*
  <xsd:complexType name="listofallmembersType">
    <xsd:sequence>
      <xsd:element name="member" type="memberRefType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { memberRefType } from '.';

const template = ({ members }: any) => `
## Members

${members.map((e: string) => `* ${e}\n`).join('')}`;

const mappers = (): Mappers => ({
  member: memberRefType,
});

export default (element: Element) => {
  const members = applyToChildren(mappers())(element);

  return template({ members });
};
