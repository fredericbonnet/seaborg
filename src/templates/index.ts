import { Element, Text, NodeBase } from '@rgrove/parse-xml';

export const $default = Symbol('default');
export const $text = Symbol('text');

export type ElementMapper = (element: Element) => string | undefined;
export type TextMapper = (text: Text) => string | undefined;

export type Mappers = {
  [key: string]: ElementMapper;
  [$default]?: ElementMapper;
  [$text]?: TextMapper;
};

export const applyToChildren = (mappers: Mappers) => (element: Element) =>
  element.children
    .map(applyToNode(mappers))
    .filter(e => typeof e !== 'undefined');

export const applyToChildrenGrouped = (mappers: Mappers) => (
  element: Element
) =>
  element.children
    .map((node: NodeBase) => ({ node, value: applyToNode(mappers)(node) }))
    .filter(e => typeof e.value !== 'undefined')
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
            // Add undef both $default and name keys
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

export const applyToNode = (mappers: Mappers) => (node: NodeBase) => {
  switch (node.type) {
    case 'element':
      return applyToElement(mappers)(node as Element);
    case 'text':
      return applyToText(mappers)(node as Text);
  }
};

export const applyToElement = (mappers: Mappers) => (element: Element) => {
  if (mappers[element.name]) return mappers[element.name](element);
  // @ts-ignore
  if (mappers[$default]) return mappers[$default](element);
};

export const applyToText = (mappers: Mappers) => (text: Text) => {
  // @ts-ignore
  if (mappers[$text]) return mappers[$text](text);
};
