import { CompoundType, CompoundKind } from '@seaborg/core/lib/models';

import { compoundPlural, joinParagraphs } from '../../../helpers';
import { compoundTree, IndentedItem } from '..';
import { buildTree } from '.';

const template = (kind: CompoundKind, compounds: IndentedItem[]) =>
  joinParagraphs([`# ${compoundPlural(kind)}`, compoundTree(compounds)]);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  // Build compound tree
  const innergroup = (compound: CompoundType) => compound.innergroup;
  const tree = buildTree(innergroup)(compounds);

  return template(kind, tree);
};
