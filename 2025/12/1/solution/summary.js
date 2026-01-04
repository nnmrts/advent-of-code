import getInput from "../../../../_common/get-input.js";

const input = await getInput();

const [presentsString, treesString] = input.trim().split(/\n{2}(?!\d:)/v);

const summary = {
	presents: presentsString
		.split("\n\n")
		.map((presentString) => (
			presentString
				.split("\n")
				.slice(1)
				.map((row) => (
					[...row]
						.map((value) => value === "#")
				))
		)),
	trees: treesString
		.split("\n")
		.map((treeString) => {
			const [areaString, quantitiesString] = treeString.split(": ");

			const [width, height] = areaString.split("x").map(Number);

			return {
				height,
				quantities: quantitiesString.split(" ").map(Number),
				width
			};
		})
};

export default summary;
