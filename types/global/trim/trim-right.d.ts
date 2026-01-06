import { Whitespace } from "./_common/_exports.ts";

/**
 * Remove spaces from the right side.
 */
type TrimRight<V extends string> = V extends `${infer R}${Whitespace}` ? TrimRight<R> : V;

export default TrimRight;
