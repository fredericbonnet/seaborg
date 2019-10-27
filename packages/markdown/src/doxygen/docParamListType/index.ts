/*
  <xsd:complexType name="docParamListType">
    <xsd:sequence>
      <xsd:element name="parameteritem" type="docParamListItem" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
    <xsd:attribute name="kind" type="DoxParamListKind" /> 
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

export default (element: Element) => {
  const {
    attributes: { kind },
  } = element;
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  return template(element);
};
