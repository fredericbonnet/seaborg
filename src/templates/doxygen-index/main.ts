import Handlebars from 'handlebars';

import configuration from '../../app/services/configuration.service';
import { DoxygenType, CompoundKind } from '../../app/models/doxygen';

// FIXME label and file paths
const template = Handlebars.compile(
  `
# Main Index

{{#each kinds}}
* [{{this}}]({{this}}{{../suffix}})
{{/each}}
`,
  { noEscape: true }
);

export default (index: DoxygenType) => {
  const { contentsSuffix, mdExtension } = configuration.options;
  const suffix = `${contentsSuffix}${mdExtension}`;
  const kinds = index.compounds
    .map(compound => compound.kind)
    .reduce(
      (acc: CompoundKind[], kind) =>
        acc.includes(kind) ? acc : [...acc, kind],
      []
    );

  return template({ kinds, suffix });
};
