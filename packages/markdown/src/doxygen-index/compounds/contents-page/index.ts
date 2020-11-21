import {
  doxygenIndex,
  filter,
  flatMap,
  map,
  negate,
  pipe,
  withRefId,
} from '@seaborg/core';
import { CompoundKind, CompoundType } from '@seaborg/core/lib/models';
import { isString, isUndefined } from 'util';
import { visibleProtectionLevels } from '../../../helpers';
import { IndentedItem } from '..';

export const buildTree = (
  innerCompound: (compound: CompoundType) => string[] | undefined
) => (compounds: CompoundType[]) => {
  // Build compound tree

  // - Get global inner compound list as union of all compound inner compounds
  // const innerCompound = (compound: CompoundType) => compound.innerclass;
  const innerCompounds = pipe(
    flatMap(innerCompound),
    filter(isString)
  )(compounds) as string[];

  // - Toplevel compounds are those not belonging to global inner compound list
  const toplevelCompounds = compounds.filter(
    (compound) => !innerCompounds.includes(compound.refid)
  );

  // - Build tree as flattened list with level
  const flatten = (level: number) => (
    compound: CompoundType
  ): IndentedItem[] => {
    const self: IndentedItem = { compound, level };

    // Leaf
    if (!innerCompound(compound)) return [self];

    // Node
    const children = pipe(
      innerCompound,
      map((refid: string) => doxygenIndex.compounds.find(withRefId(refid))),
      filter(negate(isUndefined)),
      filter(visibleProtectionLevels)
    )(compound) as CompoundType[];
    return [self, ...children.flatMap(flatten(level + 1))];
  };
  return toplevelCompounds.flatMap(flatten(0));
};

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  const result = template(kind, compounds.filter(visibleProtectionLevels));

  return result;
};
