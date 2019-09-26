import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '../../../app/models/doxygenindex';

// FIXME title and file paths
const template = Handlebars.compile(
  `
# Index of {{kind}}

{{#each compounds}}
* [{{this.name}}](tmp/{{this.refid}}.md)
{{/each}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  return template({ kind, compounds });
};
