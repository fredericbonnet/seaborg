/*
  <xsd:complexType name="docListType">
    <xsd:sequence>
      <xsd:element name="listitem" type="docListItemType" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { docListItemType } from '.';

const bulletItem = (text: string) => `* ${text}\n`;
const itemizedTemplate = ({ items }: { items: string[] }) =>
  `\n${items.map(bulletItem).join('')}`;

const orderedItem = (text: string, index: number) => `${index + 1}. ${text}\n`;
const orderedTemplate = ({ items }: { items: string[] }) =>
  `\n${items.map(orderedItem).join('')}`;

const mappers = (): Mappers => ({
  listitem: docListItemType,
});

export function itemizedlist(element: Element) {
  const items = applyToChildren(mappers())(element);

  return itemizedTemplate({ items });
}

export function orderedlist(element: Element) {
  const items = applyToChildren(mappers())(element);

  return orderedTemplate({ items });
}
