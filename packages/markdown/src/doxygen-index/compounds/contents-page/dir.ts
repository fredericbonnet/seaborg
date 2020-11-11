import { isString, isUndefined } from 'util';

import { CompoundType, CompoundKind } from '@seaborg/core/lib/models';
import { doxygenIndex, withRefId } from '@seaborg/core/lib/services';
import {
  pipe,
  flatMap,
  filter,
  negate,
  map,
} from '@seaborg/core/lib/operators';

import { compoundPlural } from '../../../helpers';
import { compoundTree, IndentedItem } from '..';

const template = (kind: CompoundKind, compounds: IndentedItem[]) => `
# ${compoundPlural(kind)}

${compoundTree(compounds)}
`;

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  // Build dir tree

  // - Get global innerdir list as union of all compound innerdirs
  const innerdirs = pipe(
    flatMap((compound: CompoundType) => compound.innerdir),
    filter(isString)
  )(compounds) as string[];

  // - Toplevel dirs are those not belonging to global innerdir list
  const toplevelDirs = compounds.filter(
    (compound) => !innerdirs.includes(compound.refid)
  );

  // - Build tree as flattened list with level
  const flatten = (level: number) => (
    compound: CompoundType
  ): IndentedItem[] => {
    const self: IndentedItem = { compound, level };

    // Leaf
    if (!compound.innerdir) return [self];

    // Node
    const children = pipe(
      map((refid: string) => doxygenIndex.compounds.find(withRefId(refid))),
      filter(negate(isUndefined))
    )(compound.innerdir) as CompoundType[];
    return [self, ...children.flatMap(flatten(level + 1))];
  };
  const tree = toplevelDirs.flatMap(flatten(0));

  return template(kind, tree);
};
