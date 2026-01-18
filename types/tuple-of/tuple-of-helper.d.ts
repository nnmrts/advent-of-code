import UnknownArray from "../_common/unknown-array.d.ts";

type TupleOfHelper<L extends number, Fill, Accumulator extends UnknownArray> = number extends L
	? Fill[]
	: L extends Accumulator["length"]
		? Accumulator
		: TupleOfHelper<L, Fill, [...Accumulator, Fill]>;

export default TupleOfHelper;
