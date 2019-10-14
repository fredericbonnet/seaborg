import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '../../../../app/models/doxygen';

// FIXME title paths
const template = Handlebars.compile(
  `
# Index of {{kind}}

{{> compound-list items=compounds}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  return template({ kind, compounds });
};
