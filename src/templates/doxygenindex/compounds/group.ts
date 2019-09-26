import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '../../../app/models/doxygenindex';

// FIXME file paths
const template = Handlebars.compile(
  `
# Index of modules

{{#each compounds}}
* [{{this.name}}](tmp/{{this.refid}}.md)
{{/each}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  // TODO extract name from compound file
  return template({ kind, compounds });
};
