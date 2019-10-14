import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '../../../../app/models/doxygen';

import { groupBy, compoundInitial } from '.';

// FIXME title paths
const template = Handlebars.compile(
  `
# Index of {{kind}}

{{> compound-index}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  const index = groupBy(compoundInitial)(compounds);

  return template({ kind, index });
};
