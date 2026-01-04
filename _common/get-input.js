import {
	dirname,
	fromFileUrl,
	relative
} from "@std/path";

const {
	cwd,
	env,
	mainModule,
	openKv
} = Deno;

const [year, day] = dirname(relative(cwd(), fromFileUrl(mainModule))).split("/").map(Number);

const baseUrl = "https://adventofcode.com";

const kv = await openKv();
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
