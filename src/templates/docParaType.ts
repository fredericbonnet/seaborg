/*
  <xsd:complexType name="docParaType" mixed="true">
    <xsd:group ref="docCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { NodeBase, Element, Text } from '@rgrove/parse-xml';

import docCmdGroup from './docCmdGroup';

export default (element: Element) => {
  return element.children
    .filter((node: NodeBase) => node.type === 'text' || node.type === 'element')
    .map((node: NodeBase) => {
      switch (node.type) {
        case 'text':
          return (node as Text).text;
        case 'element':
          return docCmdGroup(node as Element);
      }
    })
    .join('\n');
};
