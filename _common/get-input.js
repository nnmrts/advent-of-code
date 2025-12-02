import {
	dirname,
	fromFileUrl,
	relative
} from "@std/path";

const {
	cwd,
	env,
	mainModule
} = Deno;

const [year, day] = dirname(relative(cwd(), fromFileUrl(mainModule))).split("/").map(Number);

const baseUrl = "https://adventofcode.com";

/**
 *
 * @example
 */
const getInput = async () => {
	const url = `${baseUrl}/${year}/day/${day}/input`;
	const response = await fetch(
		url,
		{
			headers: {
				cookie: `session=${env.get("SESSION_ID")}`
			}
		}
	);

	return response.text();
};

export default getInput;
