import {
	JoinableItem,
	RegExpExecArrayWithGroups,
	UnknownArray
} from "./_common/_exports.d.ts";
import {
	ArrayReverse,
	GreaterThan,
	IsUnion,
	ObjectEntries,
	Replace,
	Split,
	StringLength,
	Trim
} from "./global/_exports.d.ts";
import Join from "./join.d.ts";
import RegExpWithGroups from "./reg-exp-with-groups.d.ts";

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
		codePointAt(pos: number): number | undefined,

		matchAll<
			T extends string
		>(
			regexp: RegExpWithGroups<T>
		): RegExpStringIterator<RegExpExecArrayWithGroups<T>>,

		/**
		 * Matches a string with a regular expression, and returns an iterable of matches
		 * containing the results of that search.
		 *
		 * @param regexp - A variable name or string literal containing the regular expression pattern and flags.
		 */
		matchAll(regexp: RegExp): RegExpStringIterator<RegExpExecArray>,

		replace<
			ThisTemplate extends string,
			SearchValueTemplate extends string,
			ReplaceValueTemplate extends string
		>(
			this: ThisTemplate,
			searchValue: SearchValueTemplate,
			replaceValue: ReplaceValueTemplate
		): Replace<ThisTemplate, SearchValueTemplate, ReplaceValueTemplate>,

		/**
		 * Replaces text in a string, using a regular expression or search string.
		 *
		 * @param searchValue - A string or regular expression to search for.
		 * @param replaceValue - A string containing the text to replace. When the {@linkcode searchValue} is a `RegExp`, all matches are replaced if the `g` flag is set (or only those matches at the beginning, if the `y` flag is also present). Otherwise, only the first match of {@linkcode searchValue} is replaced.
		 */
		replace(searchValue: RegExp | string, replaceValue: string): string,

		/**
		 * Replaces text in a string, using a regular expression or search string.
		 *
		 * @param searchValue - A string to search for.
		 * @param replacer - A function that returns the replacement text.
		 */
		replace(
			searchValue: RegExp | string,
			replacer: (substring: string, ...arguments_: any[]) => string
		): string,

		startsWith<
			SearchTemplate extends string
		>(
			searchString: SearchTemplate
		): this is `${SearchTemplate}${string}`,

		/**
		 * Returns true if the sequence of elements of searchString converted to a String is the
		 * same as the corresponding elements of this object (converted to a String) starting at
		 * position. Otherwise returns false.
		 */
		startsWith(searchString: string, position?: number): boolean
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
			U,
			ThisTemplate extends UnknownArray
		>(
			this: ThisTemplate,
			callbackfn: (value: T, index: number, array: T[]) => U
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
			ThisTemplate extends UnknownArray,
			U
		>(
			this: ThisTemplate,
			callbackfn: (value: T, index: number, array: readonly T[]) => U,
			thisArgument?: any
		): [
			...{
				[key in keyof ThisTemplate]: U
			}
		],

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

	interface ObjectConstructor {
		// Overload for tuples - extracts key-value pairs and creates a full Record
		fromEntries<
			EntriesTemplate extends readonly (readonly [string, unknown])[]
		>(
			entries: EntriesTemplate & { readonly length: number }
		): {
			[K in EntriesTemplate[number] as K[0]]: K[1]
		},

		fromEntries<
			KeyTemplate extends string,
			ValueTemplate extends unknown
		>(
			entries: readonly (readonly [KeyTemplate, ValueTemplate])[]
		): IsUnion<KeyTemplate> extends true
			? Partial<Record<KeyTemplate, ValueTemplate>>
			: Record<KeyTemplate, ValueTemplate>,

		/**
		 * Returns an object created by key-value entries for properties and methods
		 *
		 * @param entries - An iterable object that contains key-value entries for properties and methods.
		 */
		fromEntries<T = any>(entries: Iterable<readonly [PropertyKey, T]>): { [k: string]: T },

		/**
		 * Returns an object created by key-value entries for properties and methods
		 *
		 * @param entries - An iterable object that contains key-value entries for properties and methods.
		 */
		fromEntries(entries: Iterable<readonly any[]>): any,

		entries<
			ObjectTemplate extends object
		>(object: ObjectTemplate): ObjectEntries<ObjectTemplate>,

		/**
		 * Returns an array of key/values of the enumerable own properties of an object
		 *
		 * @param o - Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
		 */
		entries<T>(o: ArrayLike<T> | { [s: string]: T }): [string, T][]
	}
}

export {};
