import { assertEquals } from "@std/assert";
import { join } from "@std/path";
import { assertSnapshot } from "@std/testing/snapshot";

import baseUrl from "../common/base-url.js";

import { getAnswer } from "./(snapshot-tests)/_exports.js";

const {
	Command,
	cwd,
	env,
	readDir,
	test
} = Deno;

const collator = new Intl.Collator("en-US", { numeric: true });

/**
 * @param {readonly Deno.DirEntry[]} folderEntries
 */
const sortFolderEntries = (folderEntries) => folderEntries
	.toSorted(({ name: nameA }, { name: nameB }) => collator.compare(nameA, nameB));

const yearsFolderPath = join(cwd(), "years");

const yearsFolderEntries = await Array.fromAsync(readDir(yearsFolderPath));

for (
	const {
		isDirectory: yearsFolderEntryIsDirectory,
		name: yearsFolderEntryName
	} of sortFolderEntries(yearsFolderEntries)
) {
	const year = Number(yearsFolderEntryName);

	if (yearsFolderEntryIsDirectory && !Number.isNaN(year)) {
		const yearFolderPath = join(yearsFolderPath, yearsFolderEntryName);

		const yearFolderEntries = await Array.fromAsync(readDir(yearFolderPath));

		for (
			const {
				isDirectory: yearFolderEntryIsDirectory,
				name: yearFolderEntryName
			} of sortFolderEntries(yearFolderEntries)
		) {
			const day = Number(yearFolderEntryName);

			if (yearFolderEntryIsDirectory && !Number.isNaN(day)) {
				const dayFolderPath = join(yearFolderPath, yearFolderEntryName);

				const dayFolderEntries = await Array.fromAsync(readDir(dayFolderPath));

				for (
					const {
						isDirectory: dayFolderEntryIsDirectory,
						name: dayFolderEntryName
					} of sortFolderEntries(dayFolderEntries)
				) {
					const part = Number(dayFolderEntryName);

					if (dayFolderEntryIsDirectory && !Number.isNaN(part)) {
						const partFolderPath = join(dayFolderPath, dayFolderEntryName);

						const solutionFileName = "solution.js";

						const solutionFilePath = join(partFolderPath, solutionFileName);

						const name = [yearsFolderEntryName, yearFolderEntryName, dayFolderEntryName].join("/");

						/**
						 * @type {string}
						 */
						let answer;

						try {
							answer = await getAnswer(year, day, part);
						}
						catch {
							// do nothing
						}

						test(
							name,
							async (context) => {
								const runSolutionCommand = new Command(
									"deno",
									{
										args: [
											"run",
											"--allow-net=adventofcode.com",
											"--allow-read=./",
											"--allow-env=SESSION_ID",
											"--env-file=.env",
											solutionFilePath
										]
									}
								);

								const decoder = new TextDecoder();

								const { stdout: rawOutput } = await runSolutionCommand.output();

								const output = decoder.decode(rawOutput).trim();

								if (answer !== undefined) {
									assertEquals(output, answer);
								}

								await assertSnapshot(context, output, { dir: "snapshots" });
							}
						);
					}
				}
			}
		}
	}
}
