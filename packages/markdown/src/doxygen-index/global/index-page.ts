import { pipe, reduce, configuration, filter } from '@seaborg/core';
import {
  DoxygenType,
  CompoundType,
  MemberType,
} from '@seaborg/core/lib/models';

import { DoxRefKind } from '../../doxygen';
import { labels as compoundLabels } from '../../doxygen/DoxCompoundKind';
import { labels as memberLabels } from '../../doxygen/DoxMemberKind';
import { uniqueBy, sortBy, groupBy, initial } from '../../operators';
import {
  bulletItem,
  joinLines,
  joinParagraphs,
  md,
  ref,
  visibleProtectionLevels,
} from '../../helpers';

/** Template for reference item */
const referenceItem = ({ kind, refid, name, label }: Reference) =>
  bulletItem(`${ref(refid, kind, md(name))} ${label}`);

/** Template map function for entry item */
const entryItem = ([key, references]: [string, Reference[]]) =>
  joinParagraphs([`## ${key}`, joinLines(references.map(referenceItem))]);

/** Main template */
const template = (index: { [key: string]: Reference[] }) =>
  joinParagraphs(['# Index', ...Object.entries(index).map(entryItem)]);

/** Reference type */
type Reference = {
  kind: DoxRefKind;
  refid: string;
  name: string;
  label: string;
  prot?: string;
};

/** Get reference from compound */
const compoundReference = (compound: CompoundType): Reference => ({
  kind: 'compound',
  refid: compound.refid,
  name: compoundName(compound),
  label: compoundLabels[compound.kind],
  prot: compound.prot,
});

/** Get reference from member */
const memberReference = (member: MemberType): Reference => ({
  kind: 'member',
  refid: member.refid,
  name: member.name as string,
  label: memberLabels[member.kind],
  prot: member.prot,
});

/** Get compound name */
const compoundName = (compound: CompoundType) =>
  compound.title ? compound.title.join('') : compound.name;

/** Get reference name */
const referenceName = (reference: Reference) => reference.name;

/** Get reference ID */
const referenceId = (reference: Reference) => reference.refid;

/** Strip ignored prefix from reference name */
const stripPrefix = (name: string) =>
  name.replace(configuration.getIgnoredPrefixRE(), '');

/** Get reference key */
const referenceKey = pipe(referenceName, stripPrefix, initial);

/** Build index from references */
const buildIndex = pipe(
  filter(visibleProtectionLevels),
  reduce(uniqueBy(referenceId), []),
  sortBy(referenceName),
  groupBy(referenceKey)
);

export default (index: DoxygenType) => {
  const { compounds } = index;
  const idx = buildIndex([
    ...compounds.map(compoundReference),
    ...compounds.flatMap((compound) => compound.members).map(memberReference),
  ]);

  return template(idx);
};
