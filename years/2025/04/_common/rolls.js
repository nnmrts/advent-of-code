import getInput from "../../../_common/get-input.js";

const input = await getInput();

const rolls = input.trim().split("\n").map((row) => [...row].map((slot) => slot === "@"));

export default rolls;
