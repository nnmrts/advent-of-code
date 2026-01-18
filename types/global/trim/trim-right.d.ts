import { Whitespace } from "./_common/_exports.d.ts";

/**
 * Remove spaces from the right side.
 */
type TrimRight<V extends string> = V extends `${infer R}${Whitespace}` ? TrimRight<R> : V;

export default TrimRight;
