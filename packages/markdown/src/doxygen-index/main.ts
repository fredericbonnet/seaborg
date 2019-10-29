import Handlebars from 'handlebars';

import { configuration } from '@seaborg/core/lib/services';
import {
  DoxygenType,
  CompoundType,
  CompoundKind,
} from '@seaborg/core/lib/models';
import { map, pipe, reduce, ReduceFunc } from '@seaborg/core/lib/operators';
import { unique } from '../operators';

const template = Handlebars.compile(
  `
# Contents pages

* [Global contents](global{{contentsSuffix}}{{mdExtension}})
{{#each kinds}}
* [{{compound-plural this}}]({{this}}{{../contentsSuffix}}{{../mdExtension}})
{{/each}}

# Index pages

* [Global index](global{{indexSuffix}}{{mdExtension}})
{{#each kinds}}
* [{{compound-plural this}}]({{this}}{{../indexSuffix}}{{../mdExtension}})
{{/each}}
`,
  { noEscape: true }
);

/** Map compound to its kind */
const toKind = (compound: CompoundType) => compound.kind;

/** Reduce array to unique kinds */
const uniqueKinds = unique as ReduceFunc<CompoundKind, CompoundKind[]>;

export default (index: DoxygenType) => {
  const { contentsSuffix, indexSuffix, mdExtension } = configuration.options;
  const kinds = pipe(
    map(toKind),
    reduce(uniqueKinds, [])
  )(index.compounds);

  return template({ kinds, contentsSuffix, indexSuffix, mdExtension });
};
