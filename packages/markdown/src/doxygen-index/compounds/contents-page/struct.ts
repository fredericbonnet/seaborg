import { CompoundType, CompoundKind } from '@seaborg/core/lib/models';
import { compoundPlural, joinParagraphs } from '../../../helpers';
import { compoundList } from '..';

const template = (kind: CompoundKind, compounds: CompoundType[]) =>
  joinParagraphs([`# ${compoundPlural(kind)}`, compoundList(compounds)]);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  return template(kind, compounds);
};
