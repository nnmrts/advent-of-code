import baseUrl from "../../common/base-url.js";
import kv from "../../common/kv.js";

/**
 * @import RegExpWithGroups from "../../types/reg-exp-with-groups.d.ts";
 */

const {
	env
} = Deno;

/**
 * @param {number} year
 * @param {number} day
 * @param {number} part
 */
const getAnswer = async (year, day, part) => {
	const key = [
		year,
		day,
		part,
		"answer"
	];

	/**
	 * @type {Deno.KvEntryMaybe<string>}
	 */
	const { value } = await kv.get(key);

	if (value !== null) {
		return value;
	}

	const url = `${baseUrl}/${year}/day/${day}`;

	const response = await fetch(
		url,
		{
			headers: {
				cookie: `session=${env.get("SESSION_ID")}`
			}
		}
	);

	const responseText = await response.text();

	const regex = /** @type {RegExpWithGroups<"answer">} */ (
		/Your puzzle answer was <code>(?<answer>.*?)<\/code>/gv
	);

	const matches = responseText.matchAll(regex);

	const { groups: { answer } } = [...matches].filter((match) => match !== null)[part - 1];

	if (answer === undefined) {
		throw new Error("Couldn't find answer in puzzle text");
	}

	await kv.set(key, answer);

	return answer;
};

export default getAnswer;
