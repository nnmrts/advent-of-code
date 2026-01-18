import messageProperties from "../_common/message-properties.js";
import sues from "../_common/sues.js";

const sueNumber = sues
	.find((properties) => Object.entries(messageProperties)
		.every(([messageKey, messageValue]) => {
			const { [messageKey]: sueValue } = properties;

			if (sueValue === undefined) {
				return true;
			}

			switch (messageKey) {
				case "cats":
				case "trees":
					return messageValue < sueValue;
				case "goldfish":
				case "pomeranians":
					return messageValue > sueValue;
				default:
					return messageValue === sueValue;
			}
		}))
	?.number;

console.info(sueNumber);
