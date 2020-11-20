import { CompoundType, CompoundKind } from '@seaborg/core/lib/models';

import { compoundPlural, joinParagraphs } from '../../../helpers';
import { compoundTree, IndentedItem } from '..';
import { buildTree } from '.';

const template = (kind: CompoundKind, compounds: IndentedItem[]) =>
  joinParagraphs([`# ${compoundPlural(kind)}`, compoundTree(compounds)]);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  // Build compound tree
  const innerCompound = (compound: CompoundType) => compound.innerclass;
  const tree = buildTree(innerCompound)(compounds);

  return template(kind, tree);
};
