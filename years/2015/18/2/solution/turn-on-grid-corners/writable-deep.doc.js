/**
 * @import {
 * 	BuiltIns,
 * 	HasMultipleCallSignatures,
 * 	WritableArrayDeep,
 * 	WritableMapDeep,
 * 	WritableObjectDeep,
 * 	WritableSetDeep
 * } from "./writable-deep.doc/_exports.js";
 */

/**
 * Create a deeply mutable version of an `object`/`ReadonlySet`/`ReadonlySet`/`ReadonlyArray` type. The inverse of `ReadonlyDeep<T>`. Use `Writable<T>` if you only need one level deep.
 *
 * This can be used to [store and mutate options within a class](https://github.com/sindresorhus/pageres/blob/4a5d05fca19a5fbd2f53842cbf3eb7b1b63bddd2/source/index.ts#L72), [edit `readonly` objects within tests](https://stackoverflow.com/questions/50703834), [construct a `readonly` object within a function](https://github.com/Microsoft/TypeScript/issues/24509), or to define a single model where the only thing that changes is whether or not some of the keys are writable.
 *
 *  Note that types containing overloaded functions are not made deeply writable due to a [TypeScript limitation](https://github.com/microsoft/TypeScript/issues/29732).
 *
 * @template T
 * @typedef {(
 * T extends BuiltIns
 * 	? T
 * 	: T extends (...arguments_: any[]) => unknown
 * 		? {} extends WritableObjectDeep<T>
 * 			? T
 * 			: HasMultipleCallSignatures<T> extends true
 * 				? T
 * 				: ((...arguments_: Parameters<T>) => ReturnType<T>) & WritableObjectDeep<T>
 * 		: T extends ReadonlyMap<unknown, unknown>
 * 			? WritableMapDeep<T>
 * 			: T extends ReadonlySet<unknown>
 * 				? WritableSetDeep<T>
 * 				: T extends readonly unknown[]
 * 					? WritableArrayDeep<T>
 * 					: T extends object
 * 						? WritableObjectDeep<T>
 * 						: unknown
 * )} WritableDeep
 * @category Object
 * @category Array
 * @category Set
 * @category Map
 */
