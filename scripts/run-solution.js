import { join } from "@std/path";

const {
	args: [path, watch],
	Command,
	cwd
} = Deno;

const solutionFolderPath = join(cwd(), "years", path);

const solutionFilePath = join(solutionFolderPath, "solution.js");

const runSolutionCommand = new Command(
	"deno",
	{
		args: [
			"run",
			"--allow-net=adventofcode.com",
			"--allow-read=./",
			"--allow-env=SESSION_ID",
			"--env-file=.env",
			...(
				watch === "--watch"
					? ["--watch"]
					: []
			),
			solutionFilePath
		],
		stderr: "inherit",
		stdout: "inherit"
	}
);

await runSolutionCommand.output();
