import { CompoundKind, CompoundType } from '../../../../core/models';

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  const result = template(kind, compounds);

  return result;
};
