import Handlebars from 'handlebars';

import { CompoundKind, CompoundType } from '../../../../app/models/doxygen';
import { MapFunc } from '../../../../operators';

/**
 * Compound index template
 *
 * @param {CompoundIndex} index compound index
 */
Handlebars.registerPartial(
  'compound-index',
  `
{{#each index}}
## {{@key}}

{{> compound-list items=this}}

{{/each}}
`
);

/** Compound index type */
export type CompoundIndex = { [initial: string]: CompoundType[] };

/** Get compound name */
export const compoundName = (compound: CompoundType) =>
  compound.title ? compound.title.join('') : compound.name;

/** Get initial character from string  */
export const initial = (s: string) => s[0].toUpperCase();

/** Sort index by key */
const sortByKey = (index: CompoundIndex) =>
  Object.keys(index)
    .sort()
    .reduce((acc, key) => ({ ...acc, [key]: index[key] }), {} as CompoundIndex);

/** Group compounds by key */
export const groupBy = (keyFunc: MapFunc<CompoundType, string>) => (
  compounds: CompoundType[]
) =>
  sortByKey(
    compounds.reduce(
      (acc, compound) => {
        const key = keyFunc(compound);
        return { ...acc, [key]: [...(acc[key] || []), compound] };
      },
      {} as CompoundIndex
    )
  );

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
