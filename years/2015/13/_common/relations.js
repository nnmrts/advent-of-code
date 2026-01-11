import calculateSum from "../../../_common/calculate-sum.js";
import getInput from "../../../_common/get-input.js";
import ReadonlyMap from "../../../_common/readonly-map.js";

/**
 * @import Tagged from "../../../../types/tagged.d.ts";
 */

const input = await getInput();

/**
 * @typedef {Tagged<string, "StringWithoutWhitespace">} StringWithoutWhitespace
 */

/**
 * @typedef {`${StringWithoutWhitespace} would ${"lose"|"gain"} ${number} happiness units by sitting next to ${StringWithoutWhitespace}.`} InputLine
 */

const inputLines = /** @type {readonly InputLine[]} */ (
	input
		.trim()
		.split("\n")
);

const collator = new Intl.Collator("en-US", { numeric: true });

const relations = new ReadonlyMap([
	...ReadonlyMap.groupBy(
		inputLines
			.map((line) => {
				const [
					nameA,
					would,
					loseOrGain,
					happinessUnitsString,
					happiness,
					units,
					by,
					sitting,
					next,
					to,
					nameBAndPeriod
				] = line.split(" ");

				return /** @type {const} */ ({
					happinessUnits: Number(happinessUnitsString) * (loseOrGain === "lose" ? -1 : 1),
					names: /** @type {const} */ ([nameA, nameBAndPeriod.slice(0, -1)])
						.toSorted(collator.compare)
				});
			}),
		({ names }) => names.join(",")
	)
]
	.map(([key, pair]) => /** @type {const} */ ([
		key,
		{
			happinessUnits: calculateSum(
				pair
					.map(({ happinessUnits }) => happinessUnits)
			),
			names: pair[0].names
		}
	])));

export default relations;
