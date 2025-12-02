/* eslint-disable regexp/no-super-linear-backtracking -- don't care */
import sum from "../../_common/sum.js";
import idRanges from "../_common/id-ranges.js";

const ids = idRanges
	.flatMap(([rangeStart, rangeEnd]) => Array.from(
		{ length: rangeEnd - rangeStart + 1 },
		(empty, index) => rangeStart + index
	));

const invalidIds = ids
	.filter((id) => (
		String(id).match(/^(?<part>\d+)\k<part>+$/v)
	));

console.info(
	sum(invalidIds)
);
