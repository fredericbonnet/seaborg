/*
  <xsd:complexType name="docParamNameList">
    <xsd:sequence>
      <xsd:element name="parametertype" type="docParamType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="parametername" type="docParamName" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import { joinStrings } from '../helpers';
import { docParamType, docParamName } from '.';

const mappers = (): Mappers => ({
  parametertype: docParamType,
  parametername: docParamName,
});

export default (element: Element) =>
  joinStrings(applyToChildren(mappers())(element), ' ');
