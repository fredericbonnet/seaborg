/*
 * Array operators
 */

import { FilterFunc, MapFunc } from './pipe';

/** Array filter pipe operator */
export const filter = <T>(f: FilterFunc<T>) => (a: Array<T>) => a.filter(f);

/** Array map pipe operator */
export const map = <T, U>(f: MapFunc<T, U>) => (a: Array<T>) => a.map(f);

/** Array flatMap pipe operator */
export const flatMap = <T, U>(f: MapFunc<T, U>) => (a: Array<T>) =>
  a.flatMap(f);
