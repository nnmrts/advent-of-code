import getInput from "../../../_common/get-input.js";

/**
 * @import { StringWithoutWhitespace } from "../../_types/_exports.js";
 */

const input = await getInput();

/**
 * @typedef {`${StringWithoutWhitespace} can fly ${number} km/s for ${number} seconds, but then must rest for ${number} seconds.`} InputLine
 */

const inputLines = /** @type {readonly InputLine[]} */ (
	input
		.trim()
		.split("\n")
);

const collator = new Intl.Collator("en-US", { numeric: true });

const reindeerGroup = inputLines
	.map((line) => {
		const [
			name,
			can,
			fly,
			flySpeedString,
			flySpeedUnit,
			forWord,
			flyTimeString,
			flyTimeUnit,
			but,
			then,
			must,
			rest,
			forWord2,
			restTimeString
		] = line.split(" ");

		return /** @type {const} */ ({
			flySpeed: Number(flySpeedString),
			flyTime: Number(flyTimeString),
			name,
			restTime: Number(restTimeString)
		});
	})
	.toSorted(({ name: nameA }, { name: nameB }) => collator.compare(nameA, nameB));

export default reindeerGroup;
