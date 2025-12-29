import sum from "../../_common/sum.js";
import database from "../_common/database.js";

/**
 * @import { Range } from "../_types/range.doc.js";
 */

const {
	freshIngredientRanges
} = database;

/**
 * @template ItemTemplate
 * @param {readonly ItemTemplate[]} array
 * @param {(item: ItemTemplate) => boolean} condition
 */
const fork = (array, condition) => {
	/**
	 * @type {readonly [ItemTemplate[], ItemTemplate[]]}
	 */
	const forked = [[], []];

	for (const item of array) {
		forked[condition(item) ? 0 : 1].push(item);
	}

	return /** @type {readonly [readonly ItemTemplate[], readonly ItemTemplate[]]} */ (
		forked
	);
};

/**
 *
 * @param {Range} rangeA
 * @param {Range} rangeB
 */
const areRangesOverlapping = ([rangeAStart, rangeAEnd], [rangeBStart, rangeBEnd]) => (
	(
		rangeAStart >= rangeBStart &&
		rangeAStart <= rangeBEnd
	) ||
	(
		rangeAEnd >= rangeBStart &&
		rangeAEnd <= rangeBEnd
	) ||
	(
		rangeAStart <= rangeBStart &&
		rangeAEnd >= rangeBEnd
	) ||
	(
		rangeAStart >= rangeBStart &&
		rangeAEnd <= rangeBEnd
	)
);

let finished = false;

let currentRanges = [...freshIngredientRanges];

while (!finished) {
	finished = true;

	/**
	 * @type {Range[]}
	 */
	const combinedRanges = [];

	for (const range of currentRanges) {
		const [overlappingRanges, rest] = fork(
			currentRanges.filter((innerRange) => innerRange !== range),
			(innerRange) => areRangesOverlapping(range, innerRange)
		);

		if (overlappingRanges.length > 0) {
			finished = false;

			const correctedRangeStart = Math.min(
				...[...overlappingRanges, range]
					.map(([rangeStart]) => rangeStart)
			);

			const correctedRangeEnd = Math.max(
				...[...overlappingRanges, range]
					.map(([rangeStart, rangeEnd]) => rangeEnd)
			);

			combinedRanges.push([correctedRangeStart, correctedRangeEnd]);
		}
		else {
			combinedRanges.push(range);
		}
	}

	currentRanges = /** @type {Range[]} */ (
		/** @type {unknown} */ (
			[...(new Set(combinedRanges.map((range) => range.join(","))))]
				.map((rangeString) => rangeString.split(",").map(Number))
		)
	);
}

console.info(
	sum(
		currentRanges
			.map(([rangeStart, rangeEnd]) => (rangeEnd - rangeStart) + 1)
	)
);
