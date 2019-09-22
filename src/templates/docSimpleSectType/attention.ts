import { Element } from '@rgrove/parse-xml';
import { ElementTemplateMap, applyToChildren } from '..';

import docParaType from '../docParaType';

const templates: ElementTemplateMap = {
  para: docParaType,
};

export default (element: Element) =>
  ['!> **Attention**', ...applyToChildren(templates)(element)].join('\\\n');
