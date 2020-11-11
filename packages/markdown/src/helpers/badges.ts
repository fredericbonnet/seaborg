/*
 * Shields.io badges
 *
 * https://shields.io
 */
/* TODO tests */

import { context } from '@seaborg/core';
import { DoxLanguage, DoxBool, DoxProtectionKind } from '../doxygen';

/** Helper for Shields.io badges */
export const badge = (
  key: string,
  label: string,
  message: string,
  color: string
) => {
  const url = `https://img.shields.io/badge/${encodeURIComponent(
    label
  )}-${encodeURIComponent(message)}-${color}`;
  context.addReference(key, url);
  return `![][${key}]`;
};

/** Helper for language badges */
export const languageBadge = (code: DoxLanguage) =>
  code ? badge(code, 'language', code, 'blue') : '';

/** Helper for protection badges */
export const protectionBadge = (code: DoxProtectionKind) => {
  switch (code) {
    case 'public':
      return badge('public', '', 'public', 'brightgreen');
    case 'protected':
      return badge('protected', '', 'protected', 'yellow');
    case 'private':
      return badge('private', '', 'private', 'red');
    case 'package':
      return badge('package', '', 'package', 'blueviolet');
  }
};

/** Helper for boolean badges */
export const boolBadge = (label: string, color: string, value: DoxBool) =>
  value === 'yes' ? badge(label, '', label, color) : '';
