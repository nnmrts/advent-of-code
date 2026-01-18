import { walk } from "@std/fs";
import {
	dirname, join, relative
} from "@std/path";

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

const styleFilePath = join(htmlFolderPath, "style.css");
const scriptFilePath = join(htmlFolderPath, "script.js");

const styleFileContentSet = new Set();
const scriptFileContentSet = new Set();

for await (const { isFile, path } of walk(htmlFolderPath)) {
	if (isFile && path.endsWith(".html")) {
		const html = await readTextFile(path);

		const { document: parsedDocument } = parseHTML(html);

		const [footerElement] = parsedDocument?.getElementsByClassName("footer") ?? [];

		footerElement.lastChild?.remove();

		const styleElements = parsedDocument.querySelectorAll("style");

		const relativePath = relative(dirname(path), htmlFolderPath);
		const stylesheetHref = relativePath ? `${relativePath}/style.css` : "style.css";

		for (const styleElement of styleElements) {
			styleFileContentSet.add(styleElement.innerHTML);

			const linkElement = parsedDocument.createElement("link");

			linkElement.setAttribute("rel", "stylesheet");
			linkElement.setAttribute("href", stylesheetHref);

			styleElement.replaceWith(linkElement);
		}

		const scriptElements = parsedDocument.querySelectorAll("script");
		const scriptSource = relativePath ? `${relativePath}/script.js` : "script.js";

		for (const scriptElement of scriptElements) {
			scriptFileContentSet.add(scriptElement.innerHTML);

			const changedScriptElement = parsedDocument.createElement("script");

			changedScriptElement.setAttribute("src", scriptSource);

			scriptElement.replaceWith(changedScriptElement);
		}

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

const styleFileContent = [...styleFileContentSet].join("\n");
const scriptFileContent = [...scriptFileContentSet].join("\n");

await writeTextFile(styleFilePath, styleFileContent);
await writeTextFile(scriptFilePath, scriptFileContent);

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
