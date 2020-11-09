/*
  <xsd:complexType name="linkType">
    <xsd:attribute name="refid" type="xsd:string" />
    <xsd:attribute name="external" type="xsd:string" use="optional"/>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { linkHelper } from '../helpers';

// FIXME kindref
const template = ({ parentid, refid }: any) =>
  `click ${parentid} "${linkHelper(refid, 'compound')}"`;

export default (element: Element) => {
  const {
    attributes: { id: parentid },
  } = element.parent as Element;
  const {
    attributes: { refid },
  } = element;
  // TODO external

  return template({ parentid, refid });
};
