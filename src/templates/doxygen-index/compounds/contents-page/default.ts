import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '../../../../core/models';

// FIXME title paths
const template = Handlebars.compile(
  `
# {{kind}} list

{{> compound-list items=compounds}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  return template({ kind, compounds });
};
