import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import {
  locationType,
  listofallmembersType,
  compoundRefType,
  templateparamlistType,
} from '..';

import { mappers as defaultMappers } from '.';

const template = Handlebars.compile(
  `
# Class {{md compoundname}}

{{location}}

{{> compounddef-description}}

{{templateparamlist}}

{{#if basecompoundref}}
**Inherits from**:

{{#each basecompoundref}}
* {{this}}
{{/each}}
{{/if}}

{{#if derivedcompoundref}}
**Inherited by**:

{{#each derivedcompoundref}}
* {{this}}
{{/each}}
{{/if}}

{{> compounddef-list list=innerclass label="Inner classes"}}

{{listofallmembers}}

{{> compounddef-sections}}

{{> compounddef-source}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  ...defaultMappers(),
  location: locationType,
  templateparamlist: templateparamlistType,
  basecompoundref: compoundRefType,
  derivedcompoundref: compoundRefType,
  listofallmembers: listofallmembersType,
});

export default (element: Element) => {
  // TODO map kind to string
  const {
    attributes: { kind },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, kind, TODO: context[$default] });
};
