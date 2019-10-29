import Handlebars from 'handlebars';

import { MapFunc, pipe, reduce } from '@seaborg/core';
import {
  DoxygenType,
  CompoundType,
  MemberType,
} from '@seaborg/core/lib/models';

import { DoxRefKind } from '../../doxygen';
import { labels as compoundLabels } from '../../doxygen/DoxCompoundKind';
import { labels as memberLabels } from '../../doxygen/DoxMemberKind';

const template = Handlebars.compile(
  `
# Index

{{#each index}}
## {{@key}}

{{#each this}}
* {{ref refid kind (md name)}} {{label}}
{{/each}}

{{/each}}
`,
  { noEscape: true }
);

/** Reference type */
type Reference = {
  kind: DoxRefKind;
  refid: string;
  name: string;
  label: string;
};

/** Index type */
type Index = { [key: string]: Reference[] };

/** Get reference from compound */
const compoundReference = (compound: CompoundType): Reference => ({
  kind: 'compound',
  refid: compound.refid,
  name: compoundName(compound),
  label: compoundLabels[compound.kind],
});

/** Get reference from member */
const memberReference = (member: MemberType): Reference => ({
  kind: 'member',
  refid: member.refid,
  name: member.name as string,
  label: memberLabels[member.kind],
});

/** Get compound name */
const compoundName = (compound: CompoundType) =>
  compound.title ? compound.title.join('') : compound.name;

/** Get reference name */
const referenceName = (reference: Reference) => reference.name;

/** Get initial character from string  */
const initial = (s: string) => s[0].toUpperCase();

/** Get reference key */
const referenceKey = pipe(
  referenceName,
  initial
);

/** Compare strings */
const compareStrings = (a: string, b: string) => a.localeCompare(b);

/** Sort references */
const sortBy = (mapFunc: MapFunc<Reference, string>) => (
  references: Reference[]
) =>
  references.sort((a: Reference, b: Reference) =>
    compareStrings(mapFunc(a), mapFunc(b))
  );

/** Reduce array to unique reference IDs */
const uniqueIds = (a: Array<Reference>, reference: Reference) =>
  a.some(r => reference.refid === r.refid) ? a : [...a, reference];

/** Sort index by key */
const sortIndexByKey = (index: Index) =>
  Object.keys(index)
    .sort()
    .reduce((acc, key) => ({ ...acc, [key]: index[key] }), {} as Index);

/** Group references by key */
const groupBy = (keyFunc: MapFunc<Reference, string>) => (
  references: Reference[]
) =>
  sortIndexByKey(
    references.reduce(
      (acc, reference) => {
        const key = keyFunc(reference);
        return { ...acc, [key]: [...(acc[key] || []), reference] };
      },
      {} as Index
    )
  );

/** Build index from references */
const buildIndex = pipe(
  reduce(uniqueIds, []),
  sortBy(referenceName),
  groupBy(referenceKey)
);

export default (index: DoxygenType) => {
  const { compounds } = index;
  const idx = buildIndex([
    ...compounds.map(compoundReference),
    ...compounds.flatMap(compound => compound.members).map(memberReference),
  ]);

  return template({ index: idx });
};
