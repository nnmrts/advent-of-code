import calculateSum from "../../../_common/calculate-sum.js";
import idRanges from "../_common/id-ranges.js";

const ids = idRanges
	.flatMap(([rangeStart, rangeEnd]) => Array.from(
		{ length: rangeEnd - rangeStart + 1 },
		(empty, index) => rangeStart + index
	));

const invalidIds = ids
	.filter((id) => (
		String(id).length % 2 === 0 &&
		String(id).match(/^(?<part>\d+)\k<part>$/v)
	));

console.info(
	calculateSum(invalidIds)
);
