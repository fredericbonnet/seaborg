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
import Handlebars from 'handlebars';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { docTitleCmdGroup } from '.';

const template = Handlebars.compile('{{ref refid kindref text}}', {
  noEscape: true,
});

const mappers = (): Mappers => ({
  ...docTitleCmdGroup(),
  [$text]: textNode,
});

export default (element: Element) => {
  // TODO other attributes?
  const {
    attributes: { refid, kindref },
  } = element;
  const text = applyToChildren(mappers())(element).join('');
  return template({ refid, kindref, text });
};
