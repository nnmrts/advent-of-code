/**
 * @import { BuiltIns } from "../../../../../_types/built-ins.doc.js";
 * @import { HasMultipleCallSignatures } from "../../../../../_types/has-multiple-call-signatures.doc.js";
 * @import {
 * 	ReadonlyMapDeep,
 * 	ReadonlyObjectDeep,
 * 	ReadonlySetDeep
 * } from "./readonly-deep.doc/_exports.js";
 */

/**
 * Convert `object`s, `Map`s, `Set`s, and `Array`s and all of their keys/elements into immutable structures recursively.
 *
 * This is useful when a deeply nested structure needs to be exposed as completely immutable, for example, an imported JSON module or when receiving an API response that is passed around.
 *
 * Please upvote [this issue](https://github.com/microsoft/TypeScript/issues/13923) if you want to have this type as a built-in in TypeScript.
 *
 * Note that types containing overloaded functions are not made deeply readonly due to a [TypeScript limitation](https://github.com/microsoft/TypeScript/issues/29732).
 *
 * @template T
 * @typedef {T extends BuiltIns
 * 	? T
 * 	: T extends new (...arguments_: any[]) => unknown
 * 		? T // Skip class constructors
 * 		: T extends (...arguments_: any[]) => unknown
 * 			? {} extends ReadonlyObjectDeep<T>
 * 				? T
 * 				: HasMultipleCallSignatures<T> extends true
 * 					? T
 * 					: ((...arguments_: Parameters<T>) => ReturnType<T>) & ReadonlyObjectDeep<T>
 * 			: T extends Readonly<ReadonlyMap<infer KeyType, infer ValueType>>
 * 				? ReadonlyMapDeep<KeyType, Exclude<ValueType, undefined>>
 * 				: T extends Readonly<ReadonlySet<infer ItemType>>
 * 					? ReadonlySetDeep<ItemType>
 * 					: // Identify tuples to avoid converting them to arrays inadvertently; special case `readonly [...never[]]`, as it emerges undesirably from recursive invocations of ReadonlyDeep below.
 * 					T extends readonly [...never[]] | readonly []
 * 						? readonly []
 * 						: T extends readonly [infer U, ...infer V]
 * 							? readonly [ReadonlyDeep<U>, ...ReadonlyDeep<V>]
 * 							: T extends readonly [...infer U, infer V]
 * 								? readonly [...ReadonlyDeep<U>, ReadonlyDeep<V>]
 * 								: T extends ReadonlyArray<infer ItemType>
 * 									? ReadonlyArray<ReadonlyDeep<ItemType>>
 * 									: T extends object
 * 										? ReadonlyObjectDeep<T>
 * 										: unknown} ReadonlyDeep
 * @category Object
 * @category Array
 * @category Set
 * @category Map
 */
