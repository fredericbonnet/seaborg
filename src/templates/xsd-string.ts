import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildren, $text } from '.';

import textNode from './textNode';

const mappers: Mappers = {
  [$text]: textNode,
};

export default (element: Element) => applyToChildren(mappers)(element).join('');
