import Handlebars from 'handlebars';

import { CompoundType } from '../../../app/models/doxygen';

export { default as contentsPageTemplate } from './contents-page';
export { default as indexPageTemplate } from './index-page';

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
