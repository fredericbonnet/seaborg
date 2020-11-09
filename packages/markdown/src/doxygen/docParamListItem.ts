/*
  <xsd:complexType name="docParamListItem">
    <xsd:sequence>
      <xsd:element name="parameternamelist" type="docParamNameList" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="parameterdescription" type="descriptionType" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped } from '../mappers';
import { docParamNameList, descriptionType } from '.';

const template = ({ parameternamelist, parameterdescription }: any) =>
  `**${parameternamelist}**` +
  (parameterdescription ? `: ${parameterdescription}` : '');

const mappers = (): Mappers => ({
  parameternamelist: docParamNameList,
  parameterdescription: descriptionType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template(context);
};
