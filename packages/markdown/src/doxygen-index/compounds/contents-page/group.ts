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
  // Build group tree

  // - Get global innergroup list as union of all compound innergroups
  const innergroups = pipe(
    flatMap((compound: CompoundType) => compound.innergroup),
    filter(isString)
  )(compounds) as string[];

  // - Toplevel groups are those not belonging to global innergroup list
  const toplevelGroups = compounds.filter(
    (compound) => !innergroups.includes(compound.refid)
  );

  // - Build tree as flattened list with level
  const flatten = (level: number) => (
    compound: CompoundType
  ): IndentedItem[] => {
    const self: IndentedItem = { compound, level };

    // Leaf
    if (!compound.innergroup) return [self];

    // Node
    const children = pipe(
      map((refid: string) => doxygenIndex.compounds.find(withRefId(refid))),
      filter(negate(isUndefined))
    )(compound.innergroup) as CompoundType[];
    return [self, ...children.flatMap(flatten(level + 1))];
  };
  const tree = toplevelGroups.flatMap(flatten(0));

  return template(kind, tree);
};
