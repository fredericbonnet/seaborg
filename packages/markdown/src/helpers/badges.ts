/*
 * Shields.io badges
 *
 * https://shields.io
 */

import Handlebars from 'handlebars';
import { context } from '@seaborg/core';
import { DoxLanguage, DoxBool, DoxProtectionKind } from '../doxygen';

/** Handlebars helper for Shields.io badges */
const badgeHelper = (
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

/** Handlebars helper for language badges */
const languageBadgeHelper = (code: DoxLanguage) =>
  badgeHelper(code, 'language', code, 'blue');

/** Handlebars helper for protection badges */
const protectionBadgeHelper = (code: DoxProtectionKind) => {
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

/** Handlebars helper for boolean badges */
const boolBadgeHelper = (label: string, color: string, value: DoxBool) =>
  value === 'yes' ? badgeHelper(label, '', label, color) : '';

export function registerHelpers() {
  Handlebars.registerHelper('badge', badgeHelper);
  Handlebars.registerHelper('language-badge', languageBadgeHelper);
  Handlebars.registerHelper('protection-badge', protectionBadgeHelper);
  Handlebars.registerHelper('bool-badge', boolBadgeHelper);
}
