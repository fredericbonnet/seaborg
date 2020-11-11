/*
  <xsd:complexType name="refTextType">
    <xsd:simpleContent>
      <xsd:extension base="xsd:string">
       <xsd:attribute name="refid" type="xsd:string" />
       <xsd:attribute name="kindref" type="DoxRefKind" />
       <xsd:attribute name="external" type="xsd:string" use="optional"/>
       <xsd:attribute name="tooltip" type="xsd:string" use="optional"/>
      </xsd:extension>
    </xsd:simpleContent>
  </xsd:complexType>
*/

//TODO
import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { joinStrings, md, ref } from '../helpers';

const mappers = (): Mappers => ({
  [$text]: textNode,
});

export default (element: Element) => {
  // TODO other attributes?
  const {
    attributes: { refid, kindref },
  } = element;
  const text = joinStrings(applyToChildren(mappers())(element));
  return ref(refid, kindref, md(text));
};
