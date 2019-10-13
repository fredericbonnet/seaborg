/*
 * XML operators
 */

import { NodeBase, Element, Text } from '@rgrove/parse-xml';
import { pipe, MapFunc } from './pipe';
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
  pipe(
    selectElements,
    filter(withName(name))
  ) as MapFunc<NodeBase[], Element[]>;

/** Select text nodes */
export const selectTexts = pipe(
  filter(withType('text')),
  map(asTextNode)
) as MapFunc<NodeBase[], Text[]>;

/** Symbol for default element mapper */
export const $default = Symbol('default');

/** Symbol for text node mapper */
export const $text = Symbol('text');
