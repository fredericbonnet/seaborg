/*
 * Pipe operators
 */

/** Generic pipe function */
export type PipeFunc<T, U> = (t: T) => U;

/** Generic filter pipe function */
export type FilterFunc<T> = PipeFunc<T, boolean>;

/** Generic map pipe function */
export type MapFunc<T, U> = PipeFunc<T, U>;

/**
 * Function pipe
 *
 * @see https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
 */
// @ts-ignore
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

/** Filter negation operator */
export const negate = <T>(f: FilterFunc<T>) => (v: T) => !f(v);
