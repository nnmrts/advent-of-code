/**
 * This version fails the `equalWrappedTupleIntersectionToBeNeverAndNeverExpanded` test in `test-d/is-equal.ts`.
 */
type IsEqualHelper<A, B> = (<G>() => G extends A & G | G ? 1 : 2) extends
(<G>() => G extends B & G | G ? 1 : 2)
	? true
	: false;

export default IsEqualHelper;
