/**
 * Test if the given function has multiple call signatures.
 *
 * Needed to handle the case of a single call signature with properties.
 *
 * Multiple call signatures cannot currently be supported due to a TypeScript limitation.
 *
 * @template {(...parameters: unknown[]) => unknown} T
 * @typedef {(
 * 	T extends {(...parameters: infer A): unknown; (...parameters: infer B): unknown}
 * 		? B extends A
 * 			? A extends B
 * 				? false
 * 				: true
 * 			: true
 * 		: false
 * )} HasMultipleCallSignatures
 */
