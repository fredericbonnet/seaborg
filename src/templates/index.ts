import { Element, Text, NodeBase } from '@rgrove/parse-xml';

export const $default = Symbol('default');
export const $text = Symbol('text');

export type ElementTemplate = (element: Element) => string | undefined;
export type TextTemplate = (text: Text) => string | undefined;

export type TemplateMap = {
  [key: string]: ElementTemplate;
  [$default]?: ElementTemplate;
  [$text]?: TextTemplate;
};

export const applyToChildren = (templates: TemplateMap) => (element: Element) =>
  element.children.map((node: NodeBase) => {
    switch (node.type) {
      case 'element':
        return applyToElement(templates)(node as Element);
      case 'text':
        return applyToText(templates)(node as Text);
    }
  });

export const applyToElement = (templates: TemplateMap) => (
  element: Element
) => {
  if (templates[element.name]) return templates[element.name](element);
  // @ts-ignore
  if (templates[$default]) return templates[$default](element);
};

export const applyToText = (templates: TemplateMap) => (text: Text) => {
  // @ts-ignore
  if (templates[$text]) return templates[$text](text);
};
