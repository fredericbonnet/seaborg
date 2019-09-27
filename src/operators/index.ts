import { NodeBase, Element, Text } from '@rgrove/parse-xml';

// Operators

/**
 * Filter XML nodes with given type
 *
 * @param type Type to select
 * */
export const withType = (type: string) => (node: NodeBase) =>
  node.type === type;

/**
 * Filter XML element nodes with given name
 *
 * @param name Element name to select
 */
export const withName = (name: string) => (node: Element) => node.name === name;

/** Map XML node to element node */
export const asElementNode = (node: NodeBase) => node as Element;

/** Map XML node to text node */
export const asTextNode = (node: NodeBase) => node as Text;

/** Map XML element node to its children */
export const toChildren = (node: Element) => node.children;

/** Map XML text node to its text string */
export const toText = (node: Text) => node.text;
