/*
  <xsd:complexType name="DoxygenType">
    <xsd:sequence maxOccurs="unbounded">
      <xsd:element name="compounddef" type="compounddefType" minOccurs="0" />
    </xsd:sequence>
    <xsd:attribute name="version" type="DoxVersionNumber" use="required" />
  </xsd:complexType>
 */

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { referencesHelper } from '../helpers';
import { compounddefType } from '.';

const template = (children: string[]) =>
  `
${children.join('\n\n')}

${referencesHelper()}
`;

const mappers = (): Mappers => ({
  compounddef: compounddefType,
});

export default (element: Element) => {
  const children = applyToChildren(mappers())(element);
  return template(children);
};
