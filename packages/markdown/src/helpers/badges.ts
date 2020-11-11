/*
 * Shields.io badges
 *
 * https://shields.io
 */
/* TODO tests */

import { context } from '@seaborg/core';
import { DoxLanguage, DoxBool, DoxProtectionKind } from '../doxygen';

/** Helper for Shields.io badges */
export const badgeHelper = (
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
export const languageBadgeHelper = (code: DoxLanguage) =>
  code ? badgeHelper(code, 'language', code, 'blue') : '';

/** Helper for protection badges */
export const protectionBadgeHelper = (code: DoxProtectionKind) => {
  switch (code) {
    case 'public':
      return badgeHelper('public', '', 'public', 'brightgreen');
    case 'protected':
      return badgeHelper('protected', '', 'protected', 'yellow');
    case 'private':
      return badgeHelper('private', '', 'private', 'red');
    case 'package':
      return badgeHelper('package', '', 'package', 'blueviolet');
  }
};

/** Helper for boolean badges */
export const boolBadgeHelper = (label: string, color: string, value: DoxBool) =>
  value === 'yes' ? badgeHelper(label, '', label, color) : '';
