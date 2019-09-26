import Handlebars from 'handlebars';

import { DoxygenType, CompoundKind } from '../../app/models/doxygen';

// FIXME label and file paths
const template = Handlebars.compile(
  `
# Main Index

{{#each kinds}}
* [{{this}}](tmp/{{this}}_index.md)
{{/each}}
`,
  { noEscape: true }
);

export default (index: DoxygenType) => {
  const kinds = index.compounds
    .map(compound => compound.kind)
    .reduce(
      (acc: CompoundKind[], kind) =>
        acc.includes(kind) ? acc : [...acc, kind],
      []
    );

  return template({ kinds });
};
