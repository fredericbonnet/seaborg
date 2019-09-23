import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildren, $text } from '.';

import textNode from './textNode';

const templates: TemplateMap = {
  [$text]: textNode,
};

export default (element: Element) =>
  applyToChildren(templates)(element).join('');
