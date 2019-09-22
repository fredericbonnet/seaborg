import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildren } from '..';

import docParaType from '../docParaType';

const templates: TemplateMap = {
  para: docParaType,
};

export default (element: Element) =>
  ['!> **Attention**', ...applyToChildren(templates)(element)].join('\\\n');
