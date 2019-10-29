import Handlebars from 'handlebars';

import { configuration } from '@seaborg/core/lib/services';
import {
  DoxygenType,
  CompoundType,
  CompoundKind,
} from '@seaborg/core/lib/models';
import { map, pipe, reduce } from '@seaborg/core/lib/operators';

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
const uniqueKinds = (a: Array<CompoundKind>, kind: CompoundKind) =>
  a.includes(kind) ? a : [...a, kind];

export default (index: DoxygenType) => {
  const { contentsSuffix, indexSuffix, mdExtension } = configuration.options;
  const kinds = pipe(
    map(toKind),
    reduce(uniqueKinds, [])
  )(index.compounds);

  return template({ kinds, contentsSuffix, indexSuffix, mdExtension });
};
