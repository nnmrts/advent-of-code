import getInput from "../../../_common/get-input.js";

const input = await getInput();

const weights = input.trim().split("\n").map(Number);

export default weights;
