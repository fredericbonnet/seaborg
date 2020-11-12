/*
  <xsd:complexType name="templateparamlistType">
    <xsd:sequence>
      <xsd:element name="param" type="paramType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { paramType } from '.';
import { bulletItem, joinLines, joinParagraphs } from '../helpers';

const mappers = (): Mappers => ({
  param: paramType,
});

export default (element: Element) => {
  const params = applyToChildren(mappers())(element);

  return joinParagraphs([
    `**Template parameters**:`,
    joinLines(params.map(bulletItem)),
  ]);
};
