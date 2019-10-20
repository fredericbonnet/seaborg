import Handlebars from 'handlebars';

import { CompoundType, CompoundKind } from '../../../../core/models';
import { pipe } from '../../../../core/operators';

import { groupBy, compoundName, initial } from '.';

const template = Handlebars.compile(
  `
# Index of structures

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
