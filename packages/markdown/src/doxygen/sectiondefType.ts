/*
  <xsd:complexType name="sectiondefType">
    <xsd:sequence>
      <xsd:element name="header" type="xsd:string" minOccurs="0" />
      <xsd:element name="description" type="descriptionType" minOccurs="0" />
      <xsd:choice maxOccurs="unbounded">
        <xsd:element name="memberdef" type="memberdefType" minOccurs="0" maxOccurs="unbounded" />
        <xsd:element name="member" type="MemberType" minOccurs="0" maxOccurs="unbounded" />
      </xsd:choice>
    </xsd:sequence>
    <xsd:attribute name="kind" type="DoxSectionKind" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped } from '../mappers';
import { xsdString } from '../generic';
import { joinParagraphs } from '../helpers';
import { descriptionType, memberdefType, MemberType } from '.';
import { labels } from './DoxSectionKind';

const template = ({ header, description, memberdef, member }: any) =>
  joinParagraphs([
    `## ${header}`,
    description,
    ...(memberdef ?? []),
    ...(member ?? []),
  ]);

const mappers = (): Mappers => ({
  header: xsdString,
  description: descriptionType,
  memberdef: memberdefType,
  member: MemberType,
});

export default (element: Element) => {
  const {
    attributes: { kind },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, header: context.header || labels[kind] });
};
