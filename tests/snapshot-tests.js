import { join } from "@std/path";
import { assertSnapshot } from "@std/testing/snapshot";

const {
	Command,
	cwd,
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
	if (yearsFolderEntryIsDirectory && !Number.isNaN(Number(yearsFolderEntryName))) {
		const yearFolderPath = join(yearsFolderPath, yearsFolderEntryName);

		const yearFolderEntries = await Array.fromAsync(readDir(yearFolderPath));

		for (
			const {
				isDirectory: yearFolderEntryIsDirectory,
				name: yearFolderEntryName
			} of sortFolderEntries(yearFolderEntries)
		) {
			if (yearFolderEntryIsDirectory && !Number.isNaN(Number(yearFolderEntryName))) {
				const dayFolderPath = join(yearFolderPath, yearFolderEntryName);

				const dayFolderEntries = await Array.fromAsync(readDir(dayFolderPath));

				for (
					const {
						isDirectory: dayFolderEntryIsDirectory,
						name: dayFolderEntryName
					} of sortFolderEntries(dayFolderEntries)
				) {
					if (dayFolderEntryIsDirectory && !Number.isNaN(Number(dayFolderEntryName))) {
						const levelFolderPath = join(dayFolderPath, dayFolderEntryName);

						const solutionFileName = "solution.js";

						const solutionFilePath = join(levelFolderPath, solutionFileName);

						const name = [yearsFolderEntryName, yearFolderEntryName, dayFolderEntryName].join("/");

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

								await assertSnapshot(context, output, { dir: "snapshots" });
							}
						);
					}
				}
			}
		}
	}
}
