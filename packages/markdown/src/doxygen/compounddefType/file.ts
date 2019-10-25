import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { ignore } from '../../operators';
import { locationType, incType } from '..';

import { mappers as defaultMappers } from '.';

const template = Handlebars.compile(
  `
# File {{md compoundname}}

{{location}}

{{> compounddef-description}}

{{> compounddef-innercompounds}}

{{#if includes}}
## Includes

{{#each includes}}
* {{this}}
{{/each}}
{{/if}}

{{#if includedby}}
## Included by

{{#each includedby}}
* {{this}}
{{/each}}
{{/if}}

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

  incdepgraph: ignore, // TODO graphs
  invincdepgraph: ignore, // TODO graphs
});

export default (element: Element) => {
  // TODO map kind to string
  const {
    attributes: { kind },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, kind, TODO: context[$default] });
};
