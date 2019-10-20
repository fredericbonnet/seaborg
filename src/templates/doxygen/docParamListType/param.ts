import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped } from '../../mappers';
import { docParamListItem } from '..';

const template = Handlebars.compile(
  `
**Parameters**:

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
