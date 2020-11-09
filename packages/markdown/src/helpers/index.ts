import Handlebars from 'handlebars';

import {
  configuration,
  doxygenIndex,
  hasMember,
  currentContext,
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

import { registerHelpers as registerBadges } from './badges';

/** Escaped Markdown char sequences */
const escapedMdChars = /[_<>]/g;

/** Escape single Markdown char sequence */
const escapeMd = (c: string) => '\\' + c;

/** Handlebars helper for Markdown escape. Useful with identifiers. */
export const mdHelper = (text: string | string[]): any =>
  Handlebars.Utils.isArray(text)
    ? (text as string[]).map(mdHelper)
    : (text as string).replace(escapedMdChars, escapeMd);

/** Handlebars helper for Markdown language code */
export const languageCodeHelper = (code: string) => codes[code];

/** Handlebars helper for links */
export const linkHelper = (refid: string, kindref: string) => {
  const { mdExtension } = configuration.options;
  switch (kindref) {
    case 'compound':
      return `${refid}${mdExtension}#${refid}`;
    case 'member': {
      const compound = doxygenIndex.compounds.find(hasMember(refid));
      if (compound) {
        return `${compound.refid}${mdExtension}#${refid}`;
      } else {
        return `#${refid}`;
      }
    }
  }
};

/** Handlebars helper for ref links */
export const refHelper = (refid: string, kindref: string, text: string) => {
  return `[${text}](${linkHelper(refid, kindref)})`;
};

/** Handlebars helper for indentation */
const indentHelper = (level: number) => '  '.repeat(level);

/** Handlebars helper for TODO lists */
export const todoHelper = (list: string[]) => {
  return list && list.length
    ? '**TODO**:\n' + list.map((e) => `* ${e}`).join('\n')
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

/** Handlebars helper for reference list */
const referencesHelper = () =>
  Object.entries(currentContext().references)
    .map(([label, { url, title }]) => `[${label}]: ${url} (${title})`)
    .join('\n');

/** Register Handlebars helpers */
export function registerHelpers() {
  Handlebars.registerHelper('md', mdHelper);
  Handlebars.registerHelper('language-code', languageCodeHelper);
  Handlebars.registerHelper('link', linkHelper);
  Handlebars.registerHelper('ref', refHelper);
  Handlebars.registerHelper('indent', indentHelper);
  Handlebars.registerHelper('compound-label', compoundLabelHelper);
  Handlebars.registerHelper('compound-plural', compoundPluralHelper);
  Handlebars.registerHelper('member-label', memberLabelHelper);
  Handlebars.registerHelper('member-plural', memberPluralHelper);
  Handlebars.registerHelper('references', referencesHelper);
  Handlebars.registerHelper('TODO', todoHelper);

  registerBadges();
}
