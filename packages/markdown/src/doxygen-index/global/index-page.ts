import Handlebars from 'handlebars';

import { pipe, reduce } from '@seaborg/core';
import {
  DoxygenType,
  CompoundType,
  MemberType,
} from '@seaborg/core/lib/models';

import { DoxRefKind } from '../../doxygen';
import { labels as compoundLabels } from '../../doxygen/DoxCompoundKind';
import { labels as memberLabels } from '../../doxygen/DoxMemberKind';
import { uniqueBy, sortBy, groupBy, initial } from '../../operators';

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

/** Get reference ID */
const referenceId = (reference: Reference) => reference.refid;

/** Get reference key */
const referenceKey = pipe(
  referenceName,
  initial
);

/** Build index from references */
const buildIndex = pipe(
  reduce(uniqueBy(referenceId), []),
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
