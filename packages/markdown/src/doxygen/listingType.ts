/*
  <xsd:complexType name="listingType">
    <xsd:sequence>
      <xsd:element name="codeline" type="codelineType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
    <xsd:attribute name="filename" type="xsd:string" use="optional"/>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { currentContext } from '@seaborg/core/lib/services';

import { Mappers, applyToChildren } from '../mappers';
import { codeBlock, languageCode } from '../helpers';
import { codelineType } from '.';

const mappers = (): Mappers => ({
  codeline: codelineType,
});

export default (element: Element) => {
  const { language } = currentContext();
  const lines = applyToChildren(mappers())(element);

  return codeBlock(languageCode(language), lines.join('\n'));
};
