import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { locationType, listofallmembersType } from '..';

import { mappers as defaultMappers, templateContext } from '.';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
# {{compound-label kind}} {{md compoundname}} {{title}}

{{> compounddef-badges}}

{{location}}

{{> compounddef-description}}

{{> compounddef-innercompounds}}

{{listofallmembers}}

{{> compounddef-sections}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  ...defaultMappers(),
  location: locationType,
  listofallmembers: listofallmembersType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
