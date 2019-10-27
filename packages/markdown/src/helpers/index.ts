import Handlebars from 'handlebars';

import {
  configuration,
  doxygenIndex,
  hasMember,
} from '@seaborg/core/lib/services';

import { codes } from '../doxygen/DoxLanguage';
import {
  DoxCompoundKind,
  labels as compoundLabels,
  plurals as compoundPlurals,
} from '../doxygen/DoxCompoundKind';
import {
  DoxMemberKind,
  labels as memberLabels,
  plurals as memberPlurals,
} from '../doxygen/DoxMemberKind';

/** Escaped Markdown char sequences */
const escapedMdChars = /[_<>]/g;

/** Escape single Markdown char sequence */
const escapeMd = (c: string) => '\\' + c;

/** Handlebars helper for Markdown escape. Useful with identifiers. */
const mdHelper = (text: string | string[]): any =>
  Handlebars.Utils.isArray(text)
    ? (text as string[]).map(mdHelper)
    : (text as string).replace(escapedMdChars, escapeMd);

/** Handlebars helper for Markdown language code */
const languageCodeHelper = (code: string) => codes[code];

/** Handlebars helper for ref links */
const refHelper = (refid: string, kindref: string, text: string) => {
  const { mdExtension } = configuration.options;
  switch (kindref) {
    case 'compound':
      return `[${text}](${refid}${mdExtension})`;
    case 'member': {
      const compound = doxygenIndex.compounds.find(hasMember(refid));
      if (compound) {
        return `[${text}](${compound.refid}${mdExtension}#${refid})`;
      } else {
        return `[${text}](#${refid})`;
      }
    }
  }
};

/** Handlebars helper for indentation */
const indentHelper = (level: number) => '  '.repeat(level);

/** Handlebars helper for bullet list items */
const bulletItemHelper = (text: string) => `* ${text}`;

/** Handlebars helper for numbered list items */
const numberedItemHelper = (text: string, index: number) =>
  `${index + 1}. ${text}`;

/** Handlebars helper for TODO lists */
const todoHelper = (list: string[]) => {
  return list && list.length
    ? '**TODO**:\n' + list.map(e => `* ${e}`).join('\n')
    : undefined;
};

/** Handlebars helper for compound label */
const compoundLabelHelper = (kind: DoxCompoundKind) => compoundLabels[kind];

/** Handlebars helper for compound plural */
const compoundPluralHelper = (kind: DoxCompoundKind) => compoundPlurals[kind];

/** Handlebars helper for member label */
const memberLabelHelper = (kind: DoxMemberKind) => memberLabels[kind];

/** Handlebars helper for member plural */
const memberPluralHelper = (kind: DoxMemberKind) => memberPlurals[kind];

/** Register Handlebars helpers */
export function registerHelpers() {
  Handlebars.registerHelper('md', mdHelper);
  Handlebars.registerHelper('language-code', languageCodeHelper);
  Handlebars.registerHelper('ref', refHelper);
  Handlebars.registerHelper('indent', indentHelper);
  Handlebars.registerHelper('bullet-item', bulletItemHelper);
  Handlebars.registerHelper('numbered-item', numberedItemHelper);
  Handlebars.registerHelper('compound-label', compoundLabelHelper);
  Handlebars.registerHelper('compound-plural', compoundPluralHelper);
  Handlebars.registerHelper('member-label', memberLabelHelper);
  Handlebars.registerHelper('member-plural', memberPluralHelper);
  Handlebars.registerHelper('TODO', todoHelper);
}
