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

const template = Handlebars.compile('{{source}} --> {{destination}}', {
  noEscape: true,
});

export default (reverse: boolean) => (element: Element) => {
  const {
    attributes: { id: parentid },
  } = element.parent as Element;
  const {
    attributes: { refid },
  } = element;

  return template({
    source: reverse ? refid : parentid,
    destination: reverse ? parentid : refid,
  });
};
