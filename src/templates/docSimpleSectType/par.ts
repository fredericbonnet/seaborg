import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped } from '..';
import Handlebars from 'handlebars';

import docTitleType from '../docTitleType';
import docParaType from '../docParaType';

const template = Handlebars.compile(
  `
**{{title}}**: \\
{{#each para}}{{this}}{{#unless @last}}\\
{{/unless}}{{/each}}
`,
  { noEscape: true }
);

const mappers: Mappers = {
  title: docTitleType,
  para: docParaType,
};

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers)(element);

  return template(context);
};
