/**
 * Represents an array with `unknown` value.
 *
 * Use case: You want a type that all arrays can be assigned to, but you don't care about the value.
 *
 * @category Type
 * @category Array
 */
type UnknownArray = readonly unknown[];

export default UnknownArray;
