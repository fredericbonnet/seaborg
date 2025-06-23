/*
  <xsd:complexType name="docListType">
    <xsd:sequence>
      <xsd:element name="listitem" type="docListItemType" maxOccurs="unbounded" />
    </xsd:sequence>
    <xsd:attribute name="type" type="DoxOlType" />
    <xsd:attribute name="start" type="xsd:integer" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { bulletItem, joinLines, orderedItem } from '../helpers';
import { docListItemType } from '.';

const itemizedTemplate = ({ items }: { items: string[] }) =>
  joinLines(items.map(bulletItem));

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
