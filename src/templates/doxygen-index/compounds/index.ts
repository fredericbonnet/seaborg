import Handlebars from 'handlebars';

import { CompoundType } from '../../../app/models/doxygen';

import contentsPage from './contents-page';
import indexPage from './index-page';
export const contentsPageTemplate = contentsPage;
export const indexPageTemplate = indexPage;

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
