/**
 * @template TargetIterableTemplate
 * @typedef {(
 * TargetIterableTemplate extends Iterable<infer ElementTemplate>
 * 	? ElementTemplate
 * 	: TargetIterableTemplate extends AsyncIterable<infer ElementTemplate>
 * 		? ElementTemplate
 * 		: never
 * )} IterableElement
 */
