/**
 *
 * @param {string} string
 * @param {readonly [string, string]} replacement
 */
const replaceAllSeparately = (
	string,
	[searchString, replacementString]
) => {
	/**
	 * @type {Set<string>}
	 */
	const distinctResults = new Set();

	let foundIndex = string.indexOf(searchString);

	while (foundIndex !== -1) {
		const replacedMolecule = string.replace(
			string.slice(0, foundIndex) + searchString,
			string.slice(0, foundIndex) + replacementString
		);

		distinctResults.add(replacedMolecule);

		foundIndex = string.indexOf(searchString, foundIndex + 1);
	}

	return distinctResults;
};

export default replaceAllSeparately;
