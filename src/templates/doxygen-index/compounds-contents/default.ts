import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '../../../app/models/doxygen';

// FIXME title paths
const template = Handlebars.compile(
  `
# Index of {{kind}}

{{#each compounds}}
{{#with this}}
* {{> compound-item this}}
{{/with}}
{{/each}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  return template({ kind, compounds });
};
