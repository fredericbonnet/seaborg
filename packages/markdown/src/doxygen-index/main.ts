import Handlebars from 'handlebars';

import { configuration } from '@seaborg/core/lib/services';
import { DoxygenType, CompoundKind } from '@seaborg/core/lib/models';

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

export default (index: DoxygenType) => {
  const { contentsSuffix, indexSuffix, mdExtension } = configuration.options;
  const kinds = index.compounds
    .map(compound => compound.kind)
    .reduce(
      (acc: CompoundKind[], kind) =>
        acc.includes(kind) ? acc : [...acc, kind],
      []
    );

  return template({ kinds, contentsSuffix, indexSuffix, mdExtension });
};
