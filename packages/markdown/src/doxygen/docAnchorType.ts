/*
  <xsd:complexType name="docAnchorType" mixed="true">
    <xsd:attribute name="id" type="xsd:string" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

export default (element: Element) => {
  const {
    attributes: { id },
  } = element;
  return `<a id="${id}"></a>\n`;
};
