import { Element, Text, NodeBase } from '@rgrove/parse-xml';

/** XML element node to string mapper function */
export type ElementMapper = (element: Element) => string | undefined;

/** XML text node to string mapper function */
export type TextMapper = (text: Text) => string | undefined;

/** Symbol for default element mapper */
export const $default = Symbol('default');

/** Symbol for text node mapper */
export const $text = Symbol('text');

/** Node to string mappers */
export type Mappers = {
  [key: string]: ElementMapper;
  [$default]?: ElementMapper;
  [$text]?: TextMapper;
};

/** Ignore node */
export const ignore = () => undefined;

/** Filter strings */
export const isString = (s: string | undefined) => typeof s === 'string';

/** Filter non-empty strings */
export const nonEmpty = (s: string | undefined) =>
  typeof s === 'string' && !!s.length;

/**
 * Apply mappers to an XML element node's children and return mapped strings in
 * order of occurrence
 *
 * @param mappers Mappers to apply
 *
 * @return XML element node to string array mapper function
 */
export const applyToChildren = (mappers: Mappers) => (element: Element) =>
  element.children.map(applyToNode(mappers)).filter(isString) as string[];

/**
 * Apply mappers to an XML element node's children and return mapped strings grouped
 * by child type, each in order of occurrence
 *
 * @note Elements matching the $default mapper are grouped under both $default
 * and their own element name
 *
 * @param mappers Mappers to apply
 *
 * @return XML element node to string dictionary mapper function
 */
export const applyToChildrenGrouped = (mappers: Mappers) => (
  element: Element
) =>
  element.children
    .map((node: NodeBase) => ({
      node,
      value: applyToNode(mappers)(node),
    }))
    .filter(e => isString(e.value))
    .reduce((acc: any, { node, value }) => {
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
    }, {});

/**
 * Apply mappers to an XML node and return the mapped string
 *
 * @param mappers Mappers to apply
 *
 * @return XML node to string mapper function
 */
export const applyToNode = (mappers: Mappers) => (node: NodeBase) => {
  switch (node.type) {
    case 'element':
      return applyToElement(mappers)(node as Element);
    case 'text':
      return applyToText(mappers)(node as Text);
  }
};

/**
 * Apply mappers to an XML element node and return the mapped string
 *
 * @param mappers Mappers to apply
 *
 * @return XML element node to string mapper function
 */
export const applyToElement = (mappers: Mappers) => (element: Element) => {
  if (mappers[element.name]) return mappers[element.name](element);
  // @ts-ignore
  if (mappers[$default]) return mappers[$default](element);
};

/**
 * Apply mappers to an XML text node and return the mapped string
 *
 * @param mappers Mappers to apply
 *
 * @return XML text node to string mapper function
 */
export const applyToText = (mappers: Mappers) => (text: Text) => {
  // @ts-ignore
  if (mappers[$text]) return mappers[$text](text);
};
