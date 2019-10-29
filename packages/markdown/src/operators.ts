import { Element } from '@rgrove/parse-xml';
import {
  MapFunc,
  FilterFunc,
  sort,
  pipe,
  reduce,
} from '@seaborg/core/lib/operators';

/** Ignore node */
export const ignore = ((() => undefined) as unknown) as MapFunc<
  Element,
  string
>;

/** Filter non-empty strings */
export const nonEmpty = (s: string | undefined) =>
  typeof s === 'string' && !!s.length;

/** Get initial character from string  */
export const initial = (s: string) => s[0].toUpperCase();

/** Compare strings */
export const compareStrings = (a: string, b: string) => a.localeCompare(b);

/** Compare mapped values */
export const compareBy = <T>(f: MapFunc<T, string>) => (a: T, b: T) =>
  compareStrings(f(a), f(b));

/** Sort by mapped values */
export const sortBy = <T>(f: MapFunc<T, string>) => sort(compareBy(f));

/** Reduce to unique values */
export const unique = <T>(a: Array<T>, t: T) => (a.includes(t) ? a : [...a, t]);

/** Reduce to unique with predicate */
export const uniqueWith = <T>(f: FilterFunc<T>) => (a: Array<T>, t: T) =>
  a.some(f) ? a : [...a, t];

/** Reduce to unique mapped values */
export const uniqueBy = <T, U>(f: MapFunc<T, U>) => (a: Array<T>, t: T) =>
  a.some(e => f(e) === f(t)) ? a : [...a, t];

/** Map value to key */
export type KeyFunc<T> = MapFunc<T, string>;

/** Reduce to values grouped by key */
export const groupedBy = <T>(f: KeyFunc<T>) => (
  acc: { [key: string]: T[] },
  t: T
) => {
  const key = f(t);
  return { ...acc, [key]: [...(acc[key] || []), t] };
};

/** Sort map by key */
export const sortMap = <T>(map: { [key: string]: T }) =>
  Object.keys(map)
    .sort()
    .reduce((acc, key) => ({ ...acc, [key]: map[key] }), {});

/** Group map by key */
export const groupBy = <T>(f: KeyFunc<T>) =>
  pipe(
    reduce(groupedBy(f), {}),
    sortMap
  );
