import { isArray } from 'util';

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

import { MemberKind } from '@seaborg/core';

/** Escaped Markdown char sequences */
const escapedMdChars = /[_<>]/g;

/** Escape single Markdown char sequence */
const escapeMd = (c: string) => '\\' + c;

/** Helper for Markdown escape. Useful with identifiers. */
export const mdHelper = (text: string | string[]): any =>
  isArray(text)
    ? (text as string[]).map(mdHelper)
    : (text as string).replace(escapedMdChars, escapeMd);

/** Helper for Markdown language code */
export const languageCodeHelper = (code: string) => codes[code];

/** Helper for links */
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

/** Helper for ref links */
export const refHelper = (refid: string, kindref: string, text: string) => {
  return `[${text}](${linkHelper(refid, kindref)})`;
};

/** Helper for indentation */
export const indentHelper = (level: number) => '  '.repeat(level);

/** Helper for TODO lists */
export const todoHelper = (list: string[]) => {
  return list && list.length
    ? '**TODO**:\n' + list.map((e) => `* ${e}`).join('\n')
    : undefined;
};

/** Helper for compound label */
export const compoundLabelHelper = (kind: DoxCompoundKind) =>
  compoundLabels[kind];

/** Helper for compound plural */
export const compoundPluralHelper = (kind: DoxCompoundKind) =>
  compoundPlurals[kind];

/** Helper for member label */
export const memberLabelHelper = (kind: DoxMemberKind | MemberKind) =>
  memberLabels[kind];

/** Helper for member plural */
export const memberPluralHelper = (kind: DoxMemberKind) => memberPlurals[kind];

/** Helper for reference list */
export const referencesHelper = () =>
  Object.entries(currentContext().references)
    .map(([label, { url, title }]) => `[${label}]: ${url} (${title})`)
    .join('\n');
