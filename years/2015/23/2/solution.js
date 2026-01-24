import program from "../_common/program.js";
import runProgram from "../_common/run-program.js";

const modifiedRegisters = new Map(program.registers);

modifiedRegisters.set("a", 1);

console.info(
	runProgram({
		...program,
		registers: modifiedRegisters
	})
		.get("b")
);
