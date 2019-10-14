import Handlebars from 'handlebars';
import { isString, isUndefined } from 'util';

import { CompoundType, CompoundKind } from '../../../app/models/doxygen';
import doxygenIndex from '../../../app/services/doxygen-index.service';
import { pipe, flatMap, filter, negate, map } from '../../../operators';

const template = Handlebars.compile(
  `
# Index of modules

{{#each compounds}}
{{#with this}}
{{indent level}}* {{> compound-item compound}}
{{/with}}
{{/each}}
`,
  { noEscape: true }
);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  // Build group tree

  // - Get global innergroup list as union of all compound innergroups
  const innergroups = pipe(
    flatMap((compound: CompoundType) => compound.innergroup),
    filter(isString)
  )(compounds) as string[];

  // - Toplevel groups are those not belonging to global innergroup list
  const toplevelGroups = compounds.filter(
    compound => !innergroups.includes(compound.refid)
  );

  // - Build tree as flattened list with level
  type Item = { compound: CompoundType; level: number };
  const flatten = (level: number) => (compound: CompoundType): Item[] => {
    const self: Item = { compound, level };

    // Leaf
    if (!compound.innergroup) return [self];

    // Node
    const children = pipe(
      map((refid: string) => doxygenIndex.findCompound(refid)),
      filter(negate(isUndefined))
    )(compound.innergroup) as CompoundType[];
    return [self, ...children.flatMap(flatten(level + 1))];
  };
  const tree = toplevelGroups.flatMap(flatten(0));

  return template({ kind, compounds: tree });
};
