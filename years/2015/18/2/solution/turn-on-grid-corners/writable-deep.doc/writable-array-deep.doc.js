/**
 * @import { WritableDeep } from "../writable-deep.doc.js";
 */

/**
 * Same as `WritableDeep`, but accepts only `Array`s as inputs. Internal helper for `WritableDeep`.
 *
 * @template {readonly unknown[]} ArrayType
 * @typedef {(
 * 	ArrayType extends readonly [] ? []
 * 		: ArrayType extends readonly [...infer U, infer V] ? [...WritableArrayDeep<U>, WritableDeep<V>]
 * 			: ArrayType extends readonly [infer U, ...infer V] ? [WritableDeep<U>, ...WritableArrayDeep<V>]
 * 				: ArrayType extends ReadonlyArray<infer U> ? Array<WritableDeep<U>>
 * 					: ArrayType extends Array<infer U> ? Array<WritableDeep<U>>
 * 						: ArrayType
 * )} WritableArrayDeep
 */
