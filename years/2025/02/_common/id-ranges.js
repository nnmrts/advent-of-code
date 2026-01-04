import getInput from "../../../_common/get-input.js";

const input = await getInput();

const idRanges = input.trim().split(",").map((range) => range.split("-").map(Number));

export default idRanges;
