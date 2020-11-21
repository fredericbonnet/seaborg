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
export const languageCode = (code?: string) => (code ? codes[code] : undefined);

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

/** Helper for bullet list items */
export const bulletItem = (text: string) => '* ' + text;

/** Helper for ordered list items */
export const orderedItem = (text: string, index: number) =>
  `${index + 1}. ${text}`;

/** Helper for simple section */
export const section = (title: string, text: any) =>
  text ? `**${title}**: ${text}` : '';

/** Helper for simple section lists */
export const sectionList = (
  title: string,
  items: any[],
  mapItem = bulletItem
) =>
  items && items.length
    ? joinParagraphs([`**${title}**:`, joinLines(items.map(mapItem))])
    : '';

/** Helper for TODO lists */
export const todo = (items: string[]) => sectionList('TODO', items);

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
  joinLines(
    Object.entries(currentContext().references).map(
      ([label, { url, title }]) => `[${label}]: ${url} (${title || label})`
    )
  );

/** Helper for code blocks */
export const codeBlock = (language: string | undefined, code: string) =>
  `\`\`\`${language || ''}
${code}
\`\`\``;

/** Join non-empty strings */
export const joinStrings = (strings: any[], sep: string = '') =>
  strings ? strings.filter((v) => !!v).join(sep) : '';

/** Join non-empty lines */
export const joinLines = (lines: any[]) => joinStrings(lines, '\n');

/** Join non-empty paragraphs */
export const joinParagraphs = (paragraphs: any[]) =>
  joinStrings(paragraphs, '\n\n');

/** Pad single paragraph */
export const padParagraph = (s: string) => '\n' + s.trim() + '\n';

/** Filter out elements with excluded protection level */
export const visibleProtectionLevels = ({ prot }: any) =>
  !prot || !configuration.options.excludeProtectionLevels.includes(prot);
