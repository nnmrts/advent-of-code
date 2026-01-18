import messageProperties from "../_common/message-properties.js";
import sues from "../_common/sues.js";

const sueNumber = sues
	.find((properties) => Object.entries(messageProperties)
		.every(([key, value]) => properties[key] === undefined || value === properties[key]))
	?.number;

console.info(sueNumber);
