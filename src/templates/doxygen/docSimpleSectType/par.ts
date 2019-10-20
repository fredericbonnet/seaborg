import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped } from '../../mappers';
import { docTitleType, docParaType } from '..';

const template = Handlebars.compile(
  `
**{{title}}**

{{#each para}}
{{this}}
{{/each}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  title: docTitleType,
  para: docParaType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template(context);
};
