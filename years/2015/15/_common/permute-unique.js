/**
 * @template ItemTemplate
 * @param {readonly ItemTemplate[]} items
 */
const permuteUnique = (items) => {
	/**
	 * @type {Map<ItemTemplate, number>}
	 */
	const counts = new Map();

	for (const item of items) {
		counts.set(item, (counts.get(item) ?? 0) + 1);
	}

	/**
	 * @type {{counts: typeof counts, permutation: ItemTemplate[]}[]}
	 */
	let results = [
		{
			counts: new Map(counts),
			permutation: []
		}
	];

	for (let depth = 0; depth < items.length; depth += 1) {
		const nextResults = [];

		for (const { counts: currentCounts, permutation } of results) {
			for (const key of counts.keys()) {
				if (currentCounts.get(key) === 0) {
					continue;
				}

				const updatedCounts = new Map(currentCounts);

				updatedCounts.set(key, (updatedCounts.get(key) ?? 0) - 1);
				nextResults.push({
					counts: updatedCounts,
					permutation: [...permutation, key]
				});
			}
		}

		results = nextResults;
	}

	return results.map(({ permutation }) => permutation);
};

export default permuteUnique;
