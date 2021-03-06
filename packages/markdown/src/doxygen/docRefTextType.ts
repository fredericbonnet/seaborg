/*
  <xsd:complexType name="docRefTextType" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
    <xsd:attribute name="refid" type="xsd:string" />
    <xsd:attribute name="kindref" type="DoxRefKind" />
    <xsd:attribute name="external" type="xsd:string" />
  </xsd:complexType>
*/

//TODO
import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { joinStrings, md, ref } from '../helpers';
import { docTitleCmdGroup } from '.';

const mappers = (): Mappers => ({
  ...docTitleCmdGroup(),
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
