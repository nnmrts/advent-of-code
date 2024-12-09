import { join } from "@std/path";

const {
	Command,
	args: [path],
	cwd
} = Deno;

const solutionFolderPath = join(cwd(), path);

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
			solutionFilePath
		],
		stderr: "inherit",
		stdout: "inherit"
	}
);

await runSolutionCommand.output();
