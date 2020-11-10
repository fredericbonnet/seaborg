import { CompoundKind, CompoundType } from '@seaborg/core/lib/models';
import { compoundList } from '..';

/** Index entry template */
const indexEntry = ([key, items]: [string, CompoundType[]]) => `## ${key}

${compoundList(items)}
`;

/** Compound index template */
export const compoundIndex = (index: CompoundIndex) =>
  Object.entries(index).map(indexEntry).join('\n');

/** Compound index type */
export type CompoundIndex = { [initial: string]: CompoundType[] };

/** Get compound name */
export const compoundName = (compound: CompoundType) =>
  compound.title ? compound.title.join('') : compound.name;

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  const result = template(kind, compounds);

  return result;
};
