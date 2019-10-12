import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped, applyToChildren } from '..';
import Handlebars from 'handlebars';

import docParaType from '../docParaType';

const template = Handlebars.compile(
  `
**See also**

{{#each para}}
{{this}}
{{/each}}
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

export function inline(element: Element) {
  return applyToChildren(mappers())(element)
    .join('')
    .trim();
}
