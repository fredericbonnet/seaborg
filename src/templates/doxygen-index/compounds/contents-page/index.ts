import Handlebars from 'handlebars';

import { CompoundKind, CompoundType } from '../../../../app/models/doxygen';

/** Indented compound item */
export type IndentedItem = { compound: CompoundType; level: number };

/**
 * Compound list template
 *
 * @param {CompoundType[]} items compounds
 */
Handlebars.registerPartial(
  'compound-list',
  `
{{#each items}}
* {{> compound-item this}}
{{/each}}
`
);

/**
 * Compound tree template
 *
 * @param {IndentedItem[]} items compound items
 */
Handlebars.registerPartial(
  'compound-tree',
  `
{{#each items}}
{{indent level}}* {{> compound-item compound}}
{{/each}}
`
);

/** Compound item template */
Handlebars.registerPartial(
  'compound-item',
  `
{{~#if title ~}}
{{ref refid "compound" title}}
{{~ else ~}}
{{ref refid "compound" (md name)}}
{{~/if ~}}
{{~#if briefdescription}}: {{briefdescription}}{{/if ~}}
`
);

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
