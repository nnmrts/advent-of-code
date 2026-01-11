/**
 * Returns a boolean for whether A is false.
 */
type Not<A extends boolean> = A extends true
	? false
	: A extends false
		? true
		: never;

export default Not;
