import { Element } from '@rgrove/parse-xml';
import { MapFunc } from '../core/operators';

/** Ignore node */
export const ignore = ((() => undefined) as unknown) as MapFunc<
  Element,
  string
>;

/** Filter non-empty strings */
export const nonEmpty = (s: string | undefined) =>
  typeof s === 'string' && !!s.length;

/** Map empty strings or arrays to undefined */
export const voidIfEmpty = (s: string | any[]) =>
  s && s.length ? s : undefined;
