/*
  <xsd:complexType name="docListType">
    <xsd:sequence>
      <xsd:element name="listitem" type="docListItemType" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { joinLines } from '../helpers';
import { docListItemType } from '.';

const bulletItem = (text: string) => `* ${text}`;
const itemizedTemplate = ({ items }: { items: string[] }) =>
  joinLines(items.map(bulletItem));

const orderedItem = (text: string, index: number) => `${index + 1}. ${text}`;
const orderedTemplate = ({ items }: { items: string[] }) =>
  joinLines(items.map(orderedItem));

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
