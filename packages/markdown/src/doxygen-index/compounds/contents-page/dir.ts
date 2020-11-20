import { CompoundType, CompoundKind } from '@seaborg/core/lib/models';

import { compoundPlural, joinParagraphs } from '../../../helpers';
import { compoundTree, IndentedItem } from '..';
import { buildTree } from '.';

const template = (kind: CompoundKind, compounds: IndentedItem[]) =>
  joinParagraphs([`# ${compoundPlural(kind)}`, compoundTree(compounds)]);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  // Build compound tree
  const innerdir = (compound: CompoundType) => compound.innerdir;
  const tree = buildTree(innerdir)(compounds);

  return template(kind, tree);
};
