import { NodeBase, Element, Text } from '@rgrove/parse-xml';

// Generic operators

/**
 * Function pipe
 *
 * @see https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
 */
// @ts-ignore
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

/** Not operator */
// @ts-ignore
export const not = v => !v;

/** Negation operator */
// @ts-ignore
export const negate = f => v => !f(v);

/** Array filter operator */
// @ts-ignore
export const filter = f => a => a.filter(f);

/** Array map operator */
// @ts-ignore
export const map = f => a => a.map(f);

/** Array flatMap operator */
// @ts-ignore
export const flatMap = f => a => a.flatMap(f);

// XML operators

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

/**
 * Filter XML element nodes with given attribute value
 *
 * @param name Attribute name to check
 * @param value Attribute value to select
 */
export const withAttribute = (name: string, value: string) => (node: Element) =>
  node.attributes[name] === value;

/** Map XML node to element node */
export const asElementNode = (node: NodeBase) => node as Element;

/** Map XML node to text node */
export const asTextNode = (node: NodeBase) => node as Text;

/** Map XML element node to its children */
export const toChildren = (node: Element) => node.children;

/** Map XML text node to its text string */
export const toText = (node: Text) => node.text;
