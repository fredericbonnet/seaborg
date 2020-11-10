import { CompoundType, CompoundKind } from '@seaborg/core/lib/models';
import { compoundPluralHelper } from '../../../helpers';
import { compoundList } from '..';

const template = (kind: CompoundKind, compounds: CompoundType[]) => `
# ${compoundPluralHelper(kind)}

${compoundList(compounds)}
`;

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  return template(kind, compounds);
};
