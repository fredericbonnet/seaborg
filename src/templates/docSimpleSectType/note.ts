import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped } from '..';
import Handlebars from 'handlebars';

import docParaType from '../docParaType';

const template = Handlebars.compile(
  `
?> {{#each para}}{{this}}{{#unless @last}}\\
{{/unless}}{{/each}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  para: docParaType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template(context);
};
