import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildren, $text } from '.';

import text from './textNode';

const templates: TemplateMap = {
  [$text]: text,
};

export default (element: Element) =>
  applyToChildren(templates)(element).join('');
