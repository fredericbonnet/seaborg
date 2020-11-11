import { CompoundType, CompoundKind } from '@seaborg/core/lib/models';
import { pipe } from '@seaborg/core/lib/operators';

import { initial, groupBy } from '../../../operators';
import { compoundPlural, joinParagraphs } from '../../../helpers';
import { CompoundIndex, compoundIndex, compoundName } from '.';

const template = (kind: CompoundKind, index: CompoundIndex) =>
  joinParagraphs([`# Index of ${compoundPlural(kind)}`, compoundIndex(index)]);

const buildIndex = groupBy(pipe(compoundName, initial));

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  const index = buildIndex(compounds);

  return template(kind, index);
};
