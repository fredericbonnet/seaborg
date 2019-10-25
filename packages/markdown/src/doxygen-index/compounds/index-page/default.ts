import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '@seaborg/core/lib/models';
import { pipe } from '@seaborg/core/lib/operators';

import { groupBy, compoundName, initial } from '.';

// FIXME title paths
const template = Handlebars.compile(
  `
# Index of {{kind}}

{{> compound-index}}
`,
  { noEscape: true }
);

const buildIndex = groupBy(
  pipe(
    compoundName,
    initial
  )
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  const index = buildIndex(compounds);

  return template({ kind, index });
};