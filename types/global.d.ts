import { JoinableItem, UnknownArray } from "./_common/_exports.ts";
import {
	ArrayReverse,
	GreaterThan,
	Split,
	StringLength,
	Trim
} from "./global/_exports.ts";
import Join from "./join.d.ts";

declare global {
	interface String {

		/**
		 * Removes the leading and trailing white space and line terminator characters from a string.
		 */
		trim<ThisTemplate extends string>(this: ThisTemplate): Trim<ThisTemplate>,

		/**
		 * Removes the leading and trailing white space and line terminator characters from a string.
		 */
		trim(): string,

		split<ThisTemplate extends string, SplitterTemplate extends string>(
			this: ThisTemplate,
			splitter: SplitterTemplate
		): Split<ThisTemplate, SplitterTemplate>,

		/**
		 * Split a string into substrings using the specified separator and return them as an array.
		 *
		 * @param separator - A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.
		 * @param limit - A value used to limit the number of elements returned in the array.
		 */
		split(separator: RegExp | string, limit?: number): string[],

		codePointAt<
			ThisTemplate extends string,
			PositionTemplate extends number
		>(
			this: ThisTemplate,
			pos: PositionTemplate
		): GreaterThan<StringLength<ThisTemplate>, PositionTemplate> extends true
			? number
			: undefined,

		/**
		 * Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point
		 * value of the UTF-16 encoded code point starting at the string element at position pos in
		 * the String resulting from converting this object to a String.
		 * If there is no element at that position, the result is undefined.
		 * If a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.
		 */
		codePointAt(pos: number): number | undefined
	}

	interface Array<T> {

		join<ThisTemplate extends JoinableItem[], SeparatorTemplate extends string>(
			this: ThisTemplate,
			separator?: SeparatorTemplate
		): Join<ThisTemplate, SeparatorTemplate>,

		/**
		 * Adds all the elements of an array into a string, separated by the specified separator string.
		 *
		 * @param separator - A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
		 */
		join(separator?: string): string,

		toReversed<
			ThisTemplate extends UnknownArray
		>(this: ThisTemplate): ArrayReverse<ThisTemplate>,

		/**
		 * Returns a copy of an array with its elements reversed.
		 */
		toReversed(): T[],

		map<
			ThisTemplate extends readonly string[],
			CallbackTemplate extends NumberConstructor
		>(
			this: ThisTemplate,
			callbackfn: CallbackTemplate,
			thisArgument?: any
		): ThisTemplate extends readonly string[]
			? {
				[key in keyof ThisTemplate]: ThisTemplate[key] extends `${infer InferredNumberTemplate extends number}`
					? InferredNumberTemplate
					: number
			}
			: number,

		map<
			U,
			ThisTemplate extends UnknownArray
		>(
			this: ThisTemplate,
			callbackfn: (value: T, index: number, array: T[]) => U,
			thisArgument?: any
		): ThisTemplate extends UnknownArray
			? [
				...{
					[key in keyof ThisTemplate]: U
				}
			]
			: U[],

		/**
		 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
		 *
		 * @param callbackfn - A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
		 * @param thisArgument - An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
		 */
		map<U>(
			callbackfn: (value: T, index: number, array: readonly T[]) => U,
			thisArgument?: any
		): U[],

		toSorted<
			ThisTemplate extends UnknownArray
		>(
			this: ThisTemplate,
			compareFunction?: (a: T, b: T) => number
		): ThisTemplate extends UnknownArray
			? [
				...{
					[key in keyof ThisTemplate]: T
				}
			]
			: never,

		/**
		 * Returns a copy of an array with its elements sorted.
		 *
		 * @param compareFunction - Function used to determine the order of the elements. It is expected to return
		 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
		 * value otherwise. If omitted, the elements are sorted in ascending, UTF-16 code unit order.
		 * ```ts
		 * [11, 2, 22, 1].toSorted((a, b) => a - b) // [1, 2, 11, 22]
		 * ```
		 */
		toSorted(compareFunction?: (a: T, b: T) => number): T[]
	}

	interface ReadonlyArray<T> {

		join<ThisTemplate extends readonly JoinableItem[], SeparatorTemplate extends string>(
			this: ThisTemplate,
			separator?: SeparatorTemplate
		): Join<ThisTemplate, SeparatorTemplate>,

		/**
		 * Adds all the elements of an array into a string, separated by the specified separator string.
		 *
		 * @param separator - A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
		 */
		join(separator?: string): string,

		toReversed<
			ThisTemplate extends UnknownArray
		>(this: ThisTemplate): ArrayReverse<ThisTemplate>,

		/**
		 * Returns a copy of an array with its elements reversed.
		 */
		toReversed(): T[],

		map<
			ThisTemplate extends readonly string[],
			CallbackTemplate extends NumberConstructor
		>(
			this: ThisTemplate,
			callbackfn: CallbackTemplate,
			thisArgument?: any
		): ThisTemplate extends readonly string[]
			? {
				[key in keyof ThisTemplate]: ThisTemplate[key] extends `${infer InferredNumberTemplate extends number}`
					? InferredNumberTemplate
					: number
			}
			: never,

		map<
			U,
			ThisTemplate extends UnknownArray
		>(
			this: ThisTemplate,
			callbackfn: (value: T, index: number, array: readonly T[]) => U,
			thisArgument?: any
		): ThisTemplate extends UnknownArray
			? [
				...{
					[key in keyof ThisTemplate]: U
				}
			]
			: U[],

		/**
		 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
		 *
		 * @param callbackfn - A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
		 * @param thisArgument - An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
		 */
		map<U>(
			callbackfn: (value: T, index: number, array: readonly T[]) => U,
			thisArgument?: any
		): U[],

		toSorted<
			ThisTemplate extends UnknownArray
		>(
			this: ThisTemplate,
			compareFunction?: (a: T, b: T) => number
		): ThisTemplate extends UnknownArray
			? [
				...{
					[key in keyof ThisTemplate]: T
				}
			]
			: never,

		/**
		 * Returns a copy of an array with its elements sorted.
		 *
		 * @param compareFunction - Function used to determine the order of the elements. It is expected to return
		 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
		 * value otherwise. If omitted, the elements are sorted in ascending, UTF-16 code unit order.
		 * ```ts
		 * [11, 2, 22, 1].toSorted((a, b) => a - b) // [1, 2, 11, 22]
		 * ```
		 */
		toSorted(compareFunction?: (a: T, b: T) => number): T[]

	}

	interface ReadonlyMap<K, V> {

		/**
		 * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
		 *
		 * @returns Returns the element associated with the specified key.
		 */
		get(key: K): V
	}

	interface NumberConstructor {
		new (value?: any): Number,
		<StringTemplate extends string>(value?: StringTemplate): (
			StringTemplate extends `${infer InferredNumberTemplate extends number}`
				? InferredNumberTemplate
				: number
		),
		(value?: any): number,

		/**
		 * Converts A string to an integer.
		 *
		 * @param string - A string to convert into a number.
		 * @param radix - A value between 2 and 36 that specifies the base of the number in `string`.
		 * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
		 * All other strings are considered decimal.
		 */
		parseInt(string: string, radix?: number): number
	}
}

export {};
