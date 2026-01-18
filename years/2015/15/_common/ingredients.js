/* eslint-disable regexp/no-super-linear-backtracking  -- santa isn't a hacker */
import getInput from "../../../_common/get-input.js";

/**
 * @import RegExpWithGroups from "../../../../types/reg-exp-with-groups.d.ts";
 */

const input = await getInput();

const trimmedInput = input.trim();

/**
 * @typedef {RegExpWithGroups<"name" | "capacity" | "durability" | "flavor" | "texture" | "calories">} Regex
 */

const regex = /** @type {Regex} */ (
	/^(?<name>.*?):.*?(?<capacity>-?\d+),.*?(?<durability>-?\d+),.*?(?<flavor>-?\d+),.*?(?<texture>-?\d+),.*?(?<calories>-?\d+)$/gmv
);

const matches = [...trimmedInput.matchAll(regex)];

const collator = new Intl.Collator("en-US", { numeric: true });

const ingredients = matches
	.filter((match) => match !== null)
	.map(({
		groups: {
			name,
			...rest
		}
	}) => /** @type {{name: Exclude<typeof name, undefined>} & Record<keyof rest, number>} */ ({
		...Object.fromEntries(Object.entries(rest).map(([key, value]) => [key, Number(value)])),
		name
	}))
	.toSorted(({ name: nameA }, { name: nameB }) => collator.compare(nameA, nameB));

export default ingredients;
