/*
  <xsd:complexType name="docSimpleSectType">
    <xsd:sequence>
      <xsd:element name="title" type="docTitleType" minOccurs="0" />
      <xsd:sequence minOccurs="0" maxOccurs="unbounded">
        <xsd:element name="para" type="docParaType" minOccurs="1" maxOccurs="unbounded" />
      </xsd:sequence>
    </xsd:sequence>
    <xsd:attribute name="kind" type="DoxSimpleSectKind" />
  </xsd:complexType>
*/

// TODO merge sections of the same type?

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../../mappers';
import { docTitleType, docParaType } from '..';

// TODO map kind to string
const titleTemplate = (kind: string) => `**${kind}**`;

const mappers = (): Mappers => ({
  title: docTitleType,
  para: docParaType,
});

export default (element: Element) => {
  const {
    attributes: { kind },
  } = element;

  return [titleTemplate(kind), ...applyToChildren(mappers())(element)].join(
    '\\\n'
  );
};
