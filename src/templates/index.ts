import { Element } from '@rgrove/parse-xml';
import { withType, asElementNode } from '../operators';

export type ElementTemplate = (element: Element) => string;

export type ElementTemplateMap = { [key: string]: ElementTemplate };

export const applyToChildren = (templates: ElementTemplateMap) => (
  element: Element
) =>
  element.children
    .filter(withType('element'))
    .map(asElementNode)
    .map(child => {
      if (templates[child.name]) {
        return templates[child.name](child);
      }
    });
