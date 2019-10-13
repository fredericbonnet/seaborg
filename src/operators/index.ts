import { NodeBase, Element, Text } from '@rgrove/parse-xml';

/** Generic pipe function */
export type PipeFunc<T, U> = (t: T) => U;

/**
 * Function pipe
 *
 * @see https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
 */
// @ts-ignore
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// Generic operators

/** Not operator */
export function not<T>(t: T): boolean {
  return !t;
}

/** Negation operator */
// @ts-ignore
export const negate = f => v => !f(v);

/** Genric filter pipe function */
export type FilterFunc<T> = PipeFunc<T, boolean>;

/** Array filter operator */
export function filter<T>(f: FilterFunc<T>) {
  return (a: Array<T>) => a.filter(f);
}

/** Genric map pipe function */
export type MapFunc<T, U> = PipeFunc<T, U>;

/** Array map operator */
export function map<T, U>(f: MapFunc<T, U>) {
  return (a: Array<T>) => a.map(f);
}

/** Array flatMap operator */
export function flatMap<T, U>(f: MapFunc<T, U>) {
  return (a: Array<T>) => a.flatMap(f);
}

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

/** Select element nodes */
export const selectElements = pipe(
  filter(withType('element')),
  map(asElementNode)
) as MapFunc<NodeBase[], Element[]>;

/** Filter element nodes by name */
export const filterElements = (name: string) =>
  pipe(
    selectElements,
    filter(withName(name))
  ) as MapFunc<NodeBase[], Element[]>;

/** Select text nodes */
export const selectTexts = pipe(
  filter(withType('text')),
  map(asTextNode)
) as MapFunc<NodeBase[], Text[]>;
