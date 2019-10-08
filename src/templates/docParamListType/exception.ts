import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped } from '..';
import Handlebars from 'handlebars';

import docParamListItem from '../docParamListItem';

const template = Handlebars.compile(
  `
**Exceptions**:
{{#each parameteritem}}
* {{this}}
{{/each}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  parameteritem: docParamListItem,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);
  return template(context);
};
