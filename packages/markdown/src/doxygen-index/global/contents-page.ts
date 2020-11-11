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
} from '../../helpers';

/** Template for member item */
const memberItem = ({ name, refid, kind }: MemberType) =>
  `  * ${ref(refid, 'member', md(name || ''))} ${memberLabel(kind)}`;

/** Template for compound item */
const compoundItem = ({ name, members, refid, kind, title }: CompoundType) =>
  joinLines([
    `* ${ref(refid, 'compound', md(title || name))} ${compoundLabel(kind)}`,
    ...members.map(memberItem),
  ]);

/** Main template */
const template = (compounds: CompoundType[]) =>
  joinParagraphs(['# Contents', joinLines(compounds.map(compoundItem))]);

export default (index: DoxygenType) => {
  const { compounds } = index;
  return template(compounds);
};
