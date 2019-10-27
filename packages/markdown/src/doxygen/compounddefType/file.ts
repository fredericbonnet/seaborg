import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { locationType, incType } from '..';

import { mappers as defaultMappers } from '.';

const template = Handlebars.compile(
  `
# {{compound-label kind}} {{md compoundname}}

{{location}}

{{> compounddef-description}}

{{> compounddef-innercompounds}}

{{> compounddef-list list=includes label="Includes"}}

{{> compounddef-list list=includedby label="Included by"}}

{{> compounddef-sections}}

{{> compounddef-source}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  ...defaultMappers(),
  location: locationType,
  includes: incType,
  includedby: incType,
});

export default (element: Element) => {
  const {
    attributes: { kind },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, kind, TODO: context[$default] });
};
