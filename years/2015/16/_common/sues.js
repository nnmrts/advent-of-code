import getInput from "../../../_common/get-input.js";

/**
 * @import RegExpWithGroups from "../../../../types/reg-exp-with-groups.d.ts";
 * @import ObjectEntry from "../../../../types/object-entry.d.ts";
 */

const input = await getInput();

const trimmedInput = input.trim();

/**
 * @typedef {RegExpWithGroups<"sueNumber"|"key1"|"value1"|"key2"|"value2"|"key3"|"value3">} Regex
 */

const regex = /** @type {Regex} */ (
	/^Sue (?<sueNumber>\d+): (?<key1>.*?): (?<value1>\d+), (?<key2>.*?): (?<value2>\d+), (?<key3>.*?): (?<value3>\d+)$/gmv
);

const matches = [...trimmedInput.matchAll(regex)];

/**
 * @typedef {(
 * 	"akitas" |
 * 	"cars" |
 * 	"cats" |
 * 	"children" |
 * 	"goldfish" |
 * 	"perfumes" |
 * 	"pomeranians" |
 * 	"samoyeds" |
 * 	"trees" |
 * 	"vizslas"
 * )} Property
 */

/**
 * @typedef {Omit<Exclude<(typeof matches)[number], null>["groups"], "sueNumber">} Rest
 */

/**
 * @typedef {(entry: ObjectEntry<Rest>) => entry is Extract<ObjectEntry<Rest>, [`key${string}`, unknown]>} IsKeyEntryFunction
 */

const isKeyEntry = /** @type {IsKeyEntryFunction} */ (
	/** @type {unknown} */ (
		/** @param {[string, unknown]} entry */
		([key]) => key.startsWith("key")
	)
);

const sues = matches
	.filter((match) => match !== null)
	.map(({
		groups: {
			sueNumber: sueNumberString,
			...rest
		}
	}) => ({
		...Object.fromEntries(
			Object.entries(rest)
				.filter(isKeyEntry)
				.map(([key, value]) => /** @type {const} */ ([
					/** @type {Property} */ (value),
					Number(
						rest[key.replace("key", "value")]
					)
				]))
		),
		number: Number(sueNumberString)
	}));

export default sues;
