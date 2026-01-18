import { walk } from "@std/fs";
import {
	dirname, join, relative
} from "@std/path";

import { parseHTML } from "linkedom";

import { scriptFileContent } from "./report-coverage/_exports.js";

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

for await (const { isFile, path } of walk(htmlFolderPath)) {
	if (isFile && path.endsWith(".html")) {
		const html = await readTextFile(path);

		const { document: parsedDocument } = parseHTML(html);

		// Extract style content
		const styleElements = parsedDocument.querySelectorAll("style");

		for (const styleElement of styleElements) {
			styleFileContentSet.add(styleElement.innerHTML);
		}

		// Extract page data
		const titleElement = parsedDocument.querySelector("h1");
		const title = titleElement?.innerHTML || "";

		const statElements = parsedDocument.querySelectorAll(".fl.pad1y.space-right2");
		const branchesPct = statElements[0]?.querySelector(".strong")?.textContent || "0%";
		const branchesFraction = statElements[0]?.querySelector(".fraction")?.textContent || "0/0";
		const linesPct = statElements[1]?.querySelector(".strong")?.textContent || "0%";
		const linesFraction = statElements[1]?.querySelector(".fraction")?.textContent || "0/0";

		const statusLineElement = parsedDocument.querySelector(".status-line");
		const statusClasses = statusLineElement?.className || "";
		const status = statusClasses.includes("low") ? "low" : statusClasses.includes("medium") ? "medium" : "high";

		// Extract table content and convert charts to coverage-bar
		const tableElement = parsedDocument.querySelector("table");
		const chartElements = tableElement?.querySelectorAll(".chart") || [];

		for (const chartElement of chartElements) {
			const fillElement = chartElement.querySelector(".cover-fill");
			const widthStyle = fillElement?.getAttribute("style") || "";
			const widthMatch = widthStyle.match(/width:\s*(?<value>[\d.]+)%/v);
			const { groups: { value = "0" } = {} } = widthMatch ?? {};

			const coverageBarElement = parsedDocument.createElement("coverage-bar");

			coverageBarElement.setAttribute("value", value);
			chartElement.replaceWith(coverageBarElement);
		}

		const tableContent = tableElement?.outerHTML || "";

		// Calculate relative path for assets
		const relativePath = relative(dirname(path), htmlFolderPath);
		const assetPrefix = relativePath ? `${relativePath}/` : "";

		// Generate minimal HTML
		const minimalHtml = `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="${assetPrefix}style.css" rel="stylesheet">
<script src="${assetPrefix}script.js"></script>
</head>
<body>
<coverage-page title="${title.replaceAll('"', "&quot;")}" branches-pct="${branchesPct}" branches-fraction="${branchesFraction}" lines-pct="${linesPct}" lines-fraction="${linesFraction}" status="${status}">${tableContent}</coverage-page>
</body>
</html>`;

		await writeTextFile(path, minimalHtml);

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
