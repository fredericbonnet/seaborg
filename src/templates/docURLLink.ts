/*
  <xsd:complexType name="docURLLink" mixed="true">
    <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
    <xsd:attribute name="url" type="xsd:string" />
  </xsd:complexType>
*/

import { NodeBase, Element, Text } from '@rgrove/parse-xml';

import docTitleCmdGroup from './docTitleCmdGroup';

export default (element: Element) => {
  const {
    attributes: { url },
  } = element;

  const text = element.children
    .filter((node: NodeBase) => node.type === 'text' || node.type === 'element')
    .map((node: NodeBase) => {
      switch (node.type) {
        case 'text':
          return (node as Text).text;
        case 'element':
          return docTitleCmdGroup(node as Element);
      }
    })
    .join('');

  return `[${text}](${url})`;
};
