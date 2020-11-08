import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';

import { mappers as defaultMappers, templateContext } from '.';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
# {{title}}

{{> compounddef-badges}}

{{> compounddef-description}}

{{> compounddef-innercompounds}}

{{> compounddef-sections}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  ...defaultMappers(),
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
