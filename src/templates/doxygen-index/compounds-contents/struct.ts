import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '../../../app/models/doxygen';

const template = Handlebars.compile(
  `
# Index of structures

{{> compound-list items=compounds}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  return template({ kind, compounds });
};
