import { CompoundKind, CompoundType } from '../../../app/models/doxygenindex';

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  return template(kind, compounds);
};
