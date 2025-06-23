/*
  <xsd:complexType name="childnodeType">
    <xsd:sequence>
      <xsd:element name="edgelabel" type="xsd:string" minOccurs="0" maxOccurs="unbounded"/>
    </xsd:sequence>
    <xsd:attribute name="refid" type="xsd:string" />
    <xsd:attribute name="relation" type="DoxGraphRelation" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

export default (reverse: boolean) => (element: Element) => {
  const {
    attributes: { id: parentid },
  } = element.parent as Element;
  const {
    attributes: { refid },
  } = element;

  return reverse ? `${refid} --> ${parentid}` : `${parentid} --> ${refid}`;
};
