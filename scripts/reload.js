import baseUrl from "../common/base-url.js";
import kv from "../common/kv.js";

const {
	args: [path],
	env
} = Deno;

const [year, day] = path.split("/").map(Number);

const key = [year, day];

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
