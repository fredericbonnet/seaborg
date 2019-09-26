import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '../../../app/models/doxygen';

// FIXME title and file paths
const template = Handlebars.compile(
  `
# Index of {{kind}}

{{#each compounds}}
* {{#with this}}[{{#if title}}{{title}}{{else}}{{name}}{{/if}}](tmp/{{refid}}.md){{#if briefdescription}}: {{briefdescription}}{{/if}}{{/with}}
{{/each}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  return template({ kind, compounds });
};
