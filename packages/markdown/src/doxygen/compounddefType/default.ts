import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { locationType, listofallmembersType } from '..';

import { mappers as defaultMappers } from '.';

const template = Handlebars.compile(
  `
# {{compound-label kind}} {{md compoundname}} {{title}}

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
  const {
    attributes: { kind },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, kind, TODO: context[$default] });
};
