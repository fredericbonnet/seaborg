/*
 * Generic operators
 */

/** Boolean not operator */
export const not = <T>(t: T) => !t;

/** Filter by type */
export const is = (type: string) => (v: any) => typeof v === type;
