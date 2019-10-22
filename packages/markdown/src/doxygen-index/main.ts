import Handlebars from 'handlebars';

import { configuration } from '@seaborg/core/lib/services';
import { DoxygenType, CompoundKind } from '@seaborg/core/lib/models';

// FIXME label and file paths
const template = Handlebars.compile(
  `
# Contents pages

{{#each kinds}}
* [{{this}}]({{this}}{{../contentsSuffix}}{{../mdExtension}})
{{/each}}

# Index pages

{{#each kinds}}
* [{{this}}]({{this}}{{../indexSuffix}}{{../mdExtension}})
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
