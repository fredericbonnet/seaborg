import { NodeBase, Element, Text } from '@rgrove/parse-xml';

// Operators
export const withType = (type: string) => (node: NodeBase) =>
  node.type === type;
export const withName = (name: string) => (node: Element) => node.name === name;
export const asElementNode = (node: NodeBase) => node as Element;
export const asTextNode = (node: NodeBase) => node as Text;
export const toChildren = (node: Element) => node.children;
export const toText = (node: Text) => node.text;
