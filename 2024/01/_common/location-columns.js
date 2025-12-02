import getInput from "../../../_common/get-input.js";

import { transpose } from "./location-ids/_exports.js";

const input = await getInput();

const lines = input.split("\n")
	.filter((line) => line.match(/\d+\s+\d+/v) !== null);

const locationColumns = transpose(
	lines.map((line) => line.split(/\s+/v).map(Number))
);

export default locationColumns;
