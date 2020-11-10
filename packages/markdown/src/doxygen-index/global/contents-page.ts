import {
  CompoundType,
  DoxygenType,
  MemberType,
} from '@seaborg/core/lib/models';
import {
  mdHelper,
  refHelper,
  memberLabelHelper,
  compoundLabelHelper,
} from '../../helpers';

/** Template for member item */
const memberItem = ({ name, refid, kind }: MemberType) =>
  `
  * ${refHelper(refid, 'member', mdHelper(name || ''))} ${memberLabelHelper(
    kind
  )}`;

/** Template for compound item */
const compoundItem = ({ name, members, refid, kind, title }: CompoundType) =>
  `* ${refHelper(
    refid,
    'compound',
    mdHelper(title || name)
  )} ${compoundLabelHelper(kind)} ${members.map(memberItem)}`;

/** Main template */
const template = (compounds: CompoundType[]) =>
  `
# Contents

${compounds.map(compoundItem).join('\n')}
`;

export default (index: DoxygenType) => {
  const { compounds } = index;
  return template(compounds);
};
