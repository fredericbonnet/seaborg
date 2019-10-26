/*
  <xsd:complexType name="reimplementType">
    <xsd:simpleContent>
      <xsd:extension base="xsd:string">
        <xsd:attribute name="refid" type="xsd:string" />
      </xsd:extension>
    </xsd:simpleContent>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';

const template = Handlebars.compile(`{{ref refid "member" (md text)}}`, {
  noEscape: true,
});

const mappers = (): Mappers => ({
  [$text]: textNode,
});

export default (element: Element) => {
  const {
    attributes: { refid },
  } = element;
  const text = applyToChildren(mappers())(element).join('');

  return template({ refid, text });
};
