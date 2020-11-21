import {
  CompoundType,
  DoxygenType,
  MemberType,
} from '@seaborg/core/lib/models';
import {
  md,
  ref,
  memberLabel,
  compoundLabel,
  joinParagraphs,
  joinLines,
  bulletItem,
  visibleProtectionLevels,
} from '../../helpers';

/** Template for member title */
const memberTitle = ({ name, refid, kind }: MemberType) =>
  `${ref(refid, 'member', md(name || ''))} ${memberLabel(kind)}`;

/** Template for member item */
const memberItem = (member: MemberType) =>
  '  ' + bulletItem(memberTitle(member));

/** Template for compound title */
const compoundTitle = ({ name, refid, kind, title }: CompoundType) =>
  `${ref(refid, 'compound', md(title || name))} ${compoundLabel(kind)}`;

/** Template for compound item */
const compoundItem = (compound: CompoundType) =>
  joinLines([
    bulletItem(compoundTitle(compound)),
    ...compound.members.filter(visibleProtectionLevels).map(memberItem),
  ]);

/** Main template */
const template = (compounds: CompoundType[]) =>
  joinParagraphs([
    '# Contents',
    joinLines(compounds.filter(visibleProtectionLevels).map(compoundItem)),
  ]);

export default (index: DoxygenType) => {
  const { compounds } = index;
  return template(compounds);
};
