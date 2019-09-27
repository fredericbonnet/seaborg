import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '../../../app/models/doxygen';

// FIXME file paths
const template = Handlebars.compile(
  `
# Index of modules

{{#each compounds}}
{{#with this}}
* {{#if title ~}}
    {{ref refid "compound" title}}
  {{~ else ~}}
    {{ref refid "compound" name}}
  {{~/if ~}}
  {{~#if briefdescription}}: {{briefdescription}}{{/if}}
{{/with}}
{{/each}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  return template({ kind, compounds });
};
