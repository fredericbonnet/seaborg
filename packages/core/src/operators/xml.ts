/*
 * XML operators
 */

import { NodeBase, Element, Text } from '@rgrove/parse-xml';
import { pipe, MapFunc, FilterFunc } from './pipe';
import { filter, map } from './array';

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
  pipe(selectElements, filter(withName(name))) as MapFunc<
    NodeBase[],
    Element[]
  >;

/** Select text nodes */
export const selectTexts = pipe(
  filter(withType('text')),
  map(asTextNode)
) as MapFunc<NodeBase[], Text[]>;

/** Symbol for default element mapper */
export const $default = Symbol('default');

/** Symbol for text node mapper */
export const $text = Symbol('text');

/** XML node mappers */
export type NodeMappers<T> = {
  [key: string]: MapFunc<Element, T>;
  [$default]?: MapFunc<Element, T>;
  [$text]?: MapFunc<Text, T>;
};

/** Map node function signature */
export type MapNodeFunc<N, T> = MapFunc<
  NodeMappers<T>,
  MapFunc<N, T | undefined>
>;

/**
 * Apply mappers to an XML node and return the mapped value
 *
 * @param mappers Mappers to apply
 *
 * @return XML node mapper function
 */
export const mapNode = <T>(mappers: NodeMappers<T>) => (node: NodeBase) => {
  switch (node.type) {
    case 'element':
      return mapElement(mappers)(node as Element);
    case 'text':
      return mapText(mappers)(node as Text);
  }
};

/**
 * Apply mappers to an XML element node and return the mapped value
 *
 * @param mappers Mappers to apply
 *
 * @return XML element node mapper function
 */
export const mapElement = <T>(mappers: NodeMappers<T>) => (
  element: Element
) => {
  if (mappers[element.name]) return mappers[element.name](element);
  // @ts-ignore
  if (mappers[$default]) return mappers[$default](element);
};

/**
 * Apply mappers to an XML text node and return the mapped value
 *
 * @param mappers Mappers to apply
 *
 * @return XML text node mapper function
 */
export const mapText = <T>(mappers: NodeMappers<T>) => (text: Text) => {
  // @ts-ignore
  if (mappers[$text]) return mappers[$text](text);
};

/**
 * Apply mappers to an array of XML element nodes and return mapped values in
 * order of occurrence
 *
 * @param mappers Mappers to apply
 */
export const mapNodes = <T>(mappers: NodeMappers<T>) => (nodes: NodeBase[]) =>
  nodes.map(mapNode(mappers));

/** Group node with its mapped value */
export type NodeValue<T> = { node: NodeBase; value: T | undefined };

/**
 * Apply mappers to an array of XML element nodes and return nodes along with
 * their mapped value in order of occurrence.
 *
 * @param mappers Mappers to apply
 */
export const mapNodesWithValues = <T>(mappers: NodeMappers<T>) => (
  nodes: NodeBase[]
) =>
  nodes.map(
    (node: NodeBase) =>
      ({
        node,
        value: mapNode(mappers)(node),
      } as NodeValue<T>)
  );

/** Filter node by mapped value */
export const filterNodeValue = <T>(f: FilterFunc<T | undefined>) =>
  filter(({ value }: NodeValue<T>) => f(value));

/** Mapped values grouped by node type */
export type GroupedValues<T> = {
  [key: string]: T;
  [$default]?: T;
  [$text]?: T;
};

/**
 * Grouped mapped values by node type, each in order of occurrence
 *
 * @note Elements matching the $default mapper are grouped under both $default
 * and their own element name
 *
 * @param mappers Mappers to apply
 */
export const groupValuesByNodeType = <T>(mappers: NodeMappers<T>) => (
  nodeValues: NodeValue<T>[]
) =>
  nodeValues.reduce((acc: any, { node, value }) => {
    switch (node.type) {
      case 'element': {
        const element = node as Element;
        if (mappers[element.name]) {
          return {
            ...acc,
            [element.name]: [...(acc[element.name] || []), value],
          };
        } else {
          // Add under both $default and name keys
          return {
            ...acc,
            [element.name]: [...(acc[element.name] || []), value],
            [$default]: [...(acc[$default] || []), value],
          };
        }
      }
      case 'text':
        return {
          ...acc,
          [$text]: [...(acc[$text] || []), value],
        };
    }
  }, {}) as GroupedValues<T>;

/**
 * Get all elements indexed by their IDs
 */
export const elementsById = (node: NodeBase): { [id: string]: Element } => {
  if (node.type !== 'element') return {};
  const element = node as Element;
  const {
    attributes: { id },
    children,
  } = element;
  const childrenIds = children.reduce(
    (acc, child) => ({ ...acc, ...elementsById(child) }),
    {}
  );
  return id ? { [id]: element, ...childrenIds } : childrenIds;
};
