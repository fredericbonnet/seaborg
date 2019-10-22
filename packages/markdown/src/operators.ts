import { Element } from '@rgrove/parse-xml';
import { MapFunc } from '@seaborg/core/lib/operators';

/** Ignore node */
export const ignore = ((() => undefined) as unknown) as MapFunc<
  Element,
  string
>;

/** Filter non-empty strings */
export const nonEmpty = (s: string | undefined) =>
  typeof s === 'string' && !!s.length;
