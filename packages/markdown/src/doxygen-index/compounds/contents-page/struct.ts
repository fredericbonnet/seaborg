import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '@seaborg/core/lib/models';

const template = Handlebars.compile(
  `
# Structures

{{> compound-list items=compounds}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  return template({ kind, compounds });
};