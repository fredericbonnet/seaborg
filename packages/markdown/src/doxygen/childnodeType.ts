/*
  <xsd:complexType name="childnodeType">
    <xsd:sequence>
      <xsd:element name="edgelabel" minOccurs="0" maxOccurs="unbounded"/>
    </xsd:sequence>
    <xsd:attribute name="refid" type="xsd:string" />
    <xsd:attribute name="relation" type="DoxGraphRelation" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

const template = Handlebars.compile('{{parentid}} --> {{refid}}', {
  noEscape: true,
});

export default (element: Element) => {
  const {
    attributes: { id: parentid },
  } = element.parent as Element;
  const {
    attributes: { refid },
  } = element;

  return template({ parentid, refid });
};
