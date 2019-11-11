/*
  <xsd:complexType name="refType">
    <xsd:simpleContent>
      <xsd:extension base="xsd:string">
        <xsd:attribute name="refid" type="xsd:string" />
        <xsd:attribute name="prot" type="DoxProtectionKind" use="optional"/>
      </xsd:extension>
    </xsd:simpleContent>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';

const template = Handlebars.compile('{{ref refid "compound" (md text)}}', {
  noEscape: true,
});

const mappers = (): Mappers => ({
  [$text]: textNode,
});

export default (element: Element) => {
  // TODO other attributes?
  const {
    attributes: { refid },
  } = element;
  const text = applyToChildren(mappers())(element).join('');
  return template({ refid, text });
};
