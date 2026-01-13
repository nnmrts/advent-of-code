import {
	dirname,
	fromFileUrl,
	relative
} from "@std/path";

import baseUrl from "../../common/base-url.js";
import kv from "../../common/kv.js";

const {
	cwd,
	env,
	mainModule
} = Deno;

const [year, day] = dirname(relative(cwd(), fromFileUrl(mainModule)))
	.split("/")
	.slice(1)
	.map(Number);

const key = [year, day];

/**
 *
 * @example
 */
const getInput = async () => {
	/**
	 * @type {Deno.KvEntryMaybe<string>}
	 */
	const { value } = await kv.get(key);

	if (value !== null) {
		return value;
	}

	const url = `${baseUrl}/${year}/day/${day}/input`;

	const response = await fetch(
		url,
		{
			headers: {
				cookie: `session=${env.get("SESSION_ID")}`
			}
		}
	);

	const responseText = await response.text();

	await kv.set(key, responseText);

	return responseText;
};

export default getInput;
