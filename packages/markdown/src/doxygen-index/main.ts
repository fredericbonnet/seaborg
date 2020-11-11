import { configuration } from '@seaborg/core/lib/services';
import {
  DoxygenType,
  CompoundType,
  CompoundKind,
} from '@seaborg/core/lib/models';
import { map, pipe, reduce, ReduceFunc } from '@seaborg/core/lib/operators';
import { unique } from '../operators';
import { compoundPlural, joinLines, joinParagraphs } from '../helpers';
import { DoxCompoundKind } from '../doxygen/DoxCompoundKind';

/** Template for link item */
const linkItem = (label: string, link: string) => `* [${label}](${link})`;

/** Template map function for kind item */
const kindItem = (suffix: string) => (kind: DoxCompoundKind) =>
  linkItem(compoundPlural(kind), kind + suffix);

/** Template for Contents page list */
const contentsTemplate = ({ contentsSuffix, mdExtension, kinds }: any) =>
  joinParagraphs([
    '# Contents pages',
    joinLines([
      linkItem('Global contents', 'global' + contentsSuffix + mdExtension),
      ...kinds.map(kindItem(contentsSuffix + mdExtension)),
    ]),
  ]);

/** Template for Index page list */
const indexTemplate = ({ indexSuffix, mdExtension, kinds }: any) =>
  joinParagraphs([
    '# Index pages',
    joinLines([
      linkItem('Global index', 'global' + indexSuffix + mdExtension),
      ...kinds.map(kindItem(indexSuffix + mdExtension)),
    ]),
  ]);

/** Main template */
const template = (context: any) =>
  joinParagraphs([contentsTemplate(context), indexTemplate(context)]);

/** Map compound to its kind */
const toKind = (compound: CompoundType) => compound.kind;

/** Reduce array to unique kinds */
const uniqueKinds = unique as ReduceFunc<CompoundKind, CompoundKind[]>;

export default (index: DoxygenType) => {
  const { contentsSuffix, indexSuffix, mdExtension } = configuration.options;
  const kinds = pipe(map(toKind), reduce(uniqueKinds, []))(index.compounds);

  return template({ kinds, contentsSuffix, indexSuffix, mdExtension });
};
