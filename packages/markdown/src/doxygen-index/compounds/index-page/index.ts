import Handlebars from 'handlebars';

import { CompoundKind, CompoundType } from '@seaborg/core/lib/models';

/**
 * Compound index template
 *
 * @param {CompoundIndex} index compound index
 */
Handlebars.registerPartial(
  'compound-index',
  `
{{#each index}}
## {{@key}}

{{> compound-list items=this}}

{{/each}}
`
);

/** Compound index type */
export type CompoundIndex = { [initial: string]: CompoundType[] };

/** Get compound name */
export const compoundName = (compound: CompoundType) =>
  compound.title ? compound.title.join('') : compound.name;

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  const result = template(kind, compounds);

  return result;
};
