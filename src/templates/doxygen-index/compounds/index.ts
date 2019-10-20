import Handlebars from 'handlebars';

import { CompoundType } from '../../../core/models';

export { default as contentsPage } from './contents-page';
export { default as indexPage } from './index-page';

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
