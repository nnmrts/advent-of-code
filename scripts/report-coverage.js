import { walk } from "@std/fs";
import { join } from "@std/path";

import { parseHTML } from "linkedom";

const {
	Command,
	cwd,
	readTextFile,
	writeTextFile
} = Deno;

const coverageFolderPath = join(cwd(), "coverage");

const htmlCommand = new Command(
	"deno",
	{
		args: ["coverage", "--html", "--exclude=tests"],
		stderr: "inherit",
		stdout: "inherit"
	}
);

await htmlCommand.output();

const htmlFolderPath = join(coverageFolderPath, "html");

for await (const { isFile, path } of walk(htmlFolderPath)) {
	if (isFile && path.endsWith(".html")) {
		const html = await readTextFile(path);

		const { document: parsedDocument } = parseHTML(html);

		const [footerElement] = parsedDocument?.getElementsByClassName("footer") ?? [];

		footerElement.lastChild?.remove();

		await writeTextFile(path, parsedDocument.toString());

		const denoFmtHtmlCommand = new Command(
			"deno",
			{
				args: ["fmt", path]
			}
		);

		await denoFmtHtmlCommand.output();
	}
}

const lcovFilePath = join(coverageFolderPath, "lcov.info");

const lcovCommand = new Command(
	"deno",
	{
		args: [
			"coverage",
			"--lcov",
			`--output=${lcovFilePath}`,
			"--exclude=tests"
		],
		stderr: "inherit",
		stdout: "inherit"
	}
);

await lcovCommand.output();

const lcovContent = await readTextFile(lcovFilePath);

const fixedLcovContent = lcovContent.replaceAll(`${cwd()}/`, "");

await writeTextFile(lcovFilePath, fixedLcovContent);
