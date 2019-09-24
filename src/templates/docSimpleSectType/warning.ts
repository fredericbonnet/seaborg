import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildrenGrouped } from '..';
import Handlebars from 'handlebars';

import docParaType from '../docParaType';

const template = Handlebars.compile(
  `
!> **Warning** \\
{{#each para}}{{this}}{{#unless @last}}\\
{{/unless}}{{/each}}
`,
  { noEscape: true }
);

const templates: TemplateMap = {
  para: docParaType,
};

export default (element: Element) => {
  const context = applyToChildrenGrouped(templates)(element);

  return template(context);
};
