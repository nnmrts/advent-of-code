import sequence from "../_common/sequence.js";

const times = 50;

const result = Array.from({ length: times }, () => "")
	.reduce(
		(previousValue) => {
			const runs = [...(previousValue.match(/(?<number>.)\k<number>*/gv) ?? [])];

			return runs
				.map((run) => `${run.length}${run[0]}`)
				.join("");
		},
		sequence
	);

console.info(result.length);
