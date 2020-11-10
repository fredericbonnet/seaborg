import { configuration } from '@seaborg/core/lib/services';
import {
  DoxygenType,
  CompoundType,
  CompoundKind,
} from '@seaborg/core/lib/models';
import { map, pipe, reduce, ReduceFunc } from '@seaborg/core/lib/operators';
import { unique } from '../operators';
import { compoundPluralHelper } from '../helpers';
import { DoxCompoundKind } from '../doxygen/DoxCompoundKind';

/** Template for link item */
const linkItem = (label: string, link: string) => `* [${label}](${link})`;

/** Template map function for kind item */
const kindItem = (suffix: string) => (kind: DoxCompoundKind) =>
  linkItem(compoundPluralHelper(kind), kind + suffix);

/** Template for Contents page list */
const contentsTemplate = ({ contentsSuffix, mdExtension, kinds }: any) =>
  `
# Contents pages

${linkItem('Global contents', 'global' + contentsSuffix + mdExtension)}
${kinds.map(kindItem(contentsSuffix + mdExtension)).join('\n')}
`;

/** Template for Index page list */
const indexTemplate = ({ indexSuffix, mdExtension, kinds }: any) =>
  `
# Index pages

${linkItem('Global index', 'global' + indexSuffix + mdExtension)}
${kinds.map(kindItem(indexSuffix + mdExtension)).join('\n')}
`;

/** Main template */
const template = (context: any) =>
  contentsTemplate(context) + indexTemplate(context);

/** Map compound to its kind */
const toKind = (compound: CompoundType) => compound.kind;

/** Reduce array to unique kinds */
const uniqueKinds = unique as ReduceFunc<CompoundKind, CompoundKind[]>;

export default (index: DoxygenType) => {
  const { contentsSuffix, indexSuffix, mdExtension } = configuration.options;
  const kinds = pipe(map(toKind), reduce(uniqueKinds, []))(index.compounds);

  return template({ kinds, contentsSuffix, indexSuffix, mdExtension });
};
