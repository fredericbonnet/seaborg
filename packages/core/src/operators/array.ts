/*
 * Array operators
 */

import 'ts-polyfill/lib/es2019-array'; // for flatMap

import { FilterFunc, MapFunc } from './pipe';

/** Array filter pipe operator */
export const filter = <T>(f: FilterFunc<T>) => (a: Array<T>) => a.filter(f);

/** Array map pipe operator */
export const map = <T, U>(f: MapFunc<T, U>) => (a: Array<T>) => a.map(f);

/** Array flatMap pipe operator */
export const flatMap = <T, U>(f: MapFunc<T, U>) => (a: Array<T>) =>
  a.flatMap(f);

/** Array reduce function */
export type ReduceFunc<T, U> = (u: U, t: T) => U;

/** Array reduce pipe operator */
export const reduce = <T, U>(f: ReduceFunc<T, U>, u: U) => (a: Array<T>) =>
  a.reduce(f, u);

/** Array compare function */
export type CompareFunc<T> = (a: T, b: T) => number;

/** Array sort pipe operator */
export const sort = <T>(f?: CompareFunc<T>) => (a: Array<T>) => a.sort(f);
