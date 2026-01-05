import instructions from "../_common/instructions.js";

const floor = instructions.length - (instructions.replaceAll("(", "").length * 2);

console.info(floor);
