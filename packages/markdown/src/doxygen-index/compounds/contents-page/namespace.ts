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

import { compoundPlural, joinParagraphs } from '../../../helpers';
import { compoundTree, IndentedItem } from '..';

const template = (kind: CompoundKind, compounds: IndentedItem[]) =>
  joinParagraphs([`# ${compoundPlural(kind)}`, compoundTree(compounds)]);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  // Build namespace tree

  // - Get global innernamespace list as union of all compound innernamespaces
  const innernamespaces = pipe(
    flatMap((compound: CompoundType) => compound.innernamespace),
    filter(isString)
  )(compounds) as string[];

  // - Toplevel namespace are those not belonging to global innernamespace list
  const toplevelNamespaces = compounds.filter(
    (compound) => !innernamespaces.includes(compound.refid)
  );

  // - Build tree as flattened list with level
  const flatten = (level: number) => (
    compound: CompoundType
  ): IndentedItem[] => {
    const self: IndentedItem = { compound, level };

    // Leaf
    if (!compound.innernamespace) return [self];

    // Node
    const children = pipe(
      map((refid: string) => doxygenIndex.compounds.find(withRefId(refid))),
      filter(negate(isUndefined))
    )(compound.innernamespace) as CompoundType[];
    return [self, ...children.flatMap(flatten(level + 1))];
  };
  const tree = toplevelNamespaces.flatMap(flatten(0));

  return template(kind, tree);
};
