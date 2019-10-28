/*
 * Shields.io badges
 *
 * https://shields.io
 */

import Handlebars from 'handlebars';
import { context } from '@seaborg/core';

/** Handlebars helper for Shields.io badges */
const badgeHelper = (
  key: string,
  label: string,
  message: string,
  color: string
) => {
  const url = `https://img.shields.io/badge/${label}-${message}-${color}`;
  context.addReference(key, url);
  return `![][${key}]`;
};

/** Handlebars helper for language badges */
const languageBadgeHelper = (code: string) =>
  badgeHelper(code, 'language', code, 'blue');

export function registerHelpers() {
  Handlebars.registerHelper('badge', badgeHelper);
  Handlebars.registerHelper('language-badge', languageBadgeHelper);
}
