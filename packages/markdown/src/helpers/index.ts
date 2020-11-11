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
export const md = (text: string | string[]): any =>
  Array.isArray(text)
    ? (text as string[]).map(md)
    : (text as string).replace(escapedMdChars, escapeMd);

/** Helper for Markdown language code */
export const languageCode = (code: string) => codes[code];

/** Helper for links */
export const refLink = (refid: string, kindref: string) => {
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
export const ref = (refid: string, kindref: string, text: string) => {
  return `[${text}](${refLink(refid, kindref)})`;
};

/** Helper for indentation */
export const indent = (level: number) => '  '.repeat(level);

/** Helper for TODO lists */
export const todo = (list: string[]) => {
  return list && list.length
    ? '**TODO**:\n' + list.map((e) => `* ${e}`).join('\n')
    : undefined;
};

/** Helper for compound label */
export const compoundLabel = (kind: DoxCompoundKind) => compoundLabels[kind];

/** Helper for compound plural */
export const compoundPlural = (kind: DoxCompoundKind) => compoundPlurals[kind];

/** Helper for member label */
export const memberLabel = (kind: DoxMemberKind | MemberKind) =>
  memberLabels[kind];

/** Helper for member plural */
export const memberPlural = (kind: DoxMemberKind) => memberPlurals[kind];

/** Helper for reference list */
export const references = () =>
  Object.entries(currentContext().references)
    .map(([label, { url, title }]) => `[${label}]: ${url} (${title})`)
    .join('\n');
