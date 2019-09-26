import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '../../../app/models/doxygen';

// FIXME file paths
const template = Handlebars.compile(
  `
# Index of modules

{{#each compounds}}
* {{#with this}}[{{#if title}}{{title}}{{else}}{{name}}{{/if}}](tmp/{{refid}}.md){{/with}}
{{/each}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  return template({ kind, compounds });
};
