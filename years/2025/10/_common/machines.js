import getInput from "../../../_common/get-input.js";

const input = await getInput();

const machines = input
	.trim()
	.split("\n")
	.map((line) => {
		const [indicatorLightDiagramString, buttonWiringSchematicsString, joltageRequirementsString] = line.split(/(?<=\]) (?=\()|(?<=\)) (?=\{)/v);

		return {
			buttonWiringSchematics: buttonWiringSchematicsString
				.split(" ")
				.map((buttonWiringSchematicString) => buttonWiringSchematicString.slice(1, -1).split(",").map(Number)),
			indicatorLightDiagram: [...indicatorLightDiagramString]
				.slice(1, -1)
				.map((value) => value === "#"),
			joltageRequirements: joltageRequirementsString
				.slice(1, -1)
				.split(",")
				.map(Number)
		};
	});

export default machines;
