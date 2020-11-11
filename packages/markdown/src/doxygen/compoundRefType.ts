/*
  <xsd:complexType name="compoundRefType">
    <xsd:simpleContent>
      <xsd:extension base="xsd:string">
        <xsd:attribute name="refid" type="xsd:string" use="optional" />
        <xsd:attribute name="prot" type="DoxProtectionKind" />
        <xsd:attribute name="virt" type="DoxVirtualKind" />
      </xsd:extension>
    </xsd:simpleContent>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { md, ref } from '../helpers';

const template = ({ refid, text }: any) => ref(refid, 'compound', md(text));

const mappers = (): Mappers => ({
  [$text]: textNode,
});

export default (element: Element) => {
  // TODO other attributes
  const {
    attributes: { refid },
  } = element;
  const text = applyToChildren(mappers())(element).join('');
  return template({ refid, text });
};
