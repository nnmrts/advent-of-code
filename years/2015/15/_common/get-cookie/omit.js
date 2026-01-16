/**
 * @template {object} ObjectTemplate
 * @template {keyof ObjectTemplate} KeyTemplate
 * @param {ObjectTemplate} object
 * @param {readonly KeyTemplate[]} keys
 * @returns {Omit<ObjectTemplate, KeyTemplate>}
 */
const omit = (
	object,
	keys
) => {
	if (!keys || keys.length === 0) {
		return object;
	}

	return keys.reduce(
		(accumulator, key) => {
			delete accumulator[key];

			return accumulator;
		},
		{ ...object }
	);
};

export default omit;
