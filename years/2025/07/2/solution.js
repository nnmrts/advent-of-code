import manifold from "../_common/manifold.js";

/**
 *
 * @param {object} options
 * @param {number} options.columnIndex
 * @param {(typeof manifold)[number][number][][]} options.currentManifold
 * @param {number} options.rowIndex
 */
const handleEmpty = ({
	columnIndex,
	currentManifold,
	rowIndex
}) => {
	const valueAbove = currentManifold[rowIndex - 1]?.[columnIndex];

	switch (valueAbove) {
		case "S":
		case "|":
			currentManifold[rowIndex][columnIndex] = "|";
			break;

		// no default
	}
};

/**
 *
 * @param {object} options
 * @param {number} options.columnIndex
 * @param {(typeof manifold)[number][number][][]} options.currentManifold
 * @param {number} options.rowIndex
 */
const handleSplitter = ({
	columnIndex,
	currentManifold,
	rowIndex
}) => {
	const valueAbove = currentManifold[rowIndex - 1]?.[columnIndex];

	const splits = [];

	if (valueAbove === "|") {
		const row = currentManifold[rowIndex];

		if (columnIndex - 1 >= 0) {
			const nextManifold = currentManifold
				.map((innerRow) => [...innerRow]);

			nextManifold[rowIndex][columnIndex - 1] = "|";

			splits.push({
				currentManifold: nextManifold,
				rowIndex: rowIndex + 1
			});
		}

		if (columnIndex + 1 <= row.length - 1) {
			const nextManifold = currentManifold
				.map((innerRow) => [...innerRow]);

			nextManifold[rowIndex][columnIndex + 1] = "|";

			splits.push({
				currentManifold: nextManifold,
				rowIndex: rowIndex + 1
			});
		}
	}

	return splits;
};

const cachedSplitterResults = new Map();

/**
 * @template KeyTemplate
 * @template ValueTemplate
 * @param {Map<KeyTemplate, ValueTemplate>} map
 * @param {KeyTemplate} key
 * @param {(key: KeyTemplate) => ValueTemplate} callback
 */
const getOrInsertComputed = (map, key, callback) => {
	if (map.has(key)) {
		return map.get(key);
	}

	const value = callback(key);

	map.set(key, value);

	return value;
};

/**
 * @typedef {object} TraverseOptions
 * @property {(typeof manifold)[number][number][][]} currentManifold
 * @property {number} [numberOfTimelines]
 * @property {number} [rowIndex]
 */

/**
 *
 * @param {TraverseOptions} options
 */
const traverse = (
	{
		currentManifold,
		numberOfTimelines = 0,
		rowIndex = 0
	} = /** @type {TraverseOptions} */ ({})
) => {
	if (rowIndex === currentManifold.length) {
		return numberOfTimelines + 1;
	}

	const row = currentManifold[rowIndex];

	for (const [columnIndex, value] of row.entries()) {
		switch (value) {
			case ".":
				handleEmpty({
					columnIndex,
					currentManifold,
					rowIndex
				});

				break;

			case "^": {
				const splits = handleSplitter({
					columnIndex,
					currentManifold,
					rowIndex
				});

				if (splits.length > 0) {
					return getOrInsertComputed(
						cachedSplitterResults,
						`${rowIndex}${columnIndex}`,
						() => {
							let innerNumberOfTimelines = 0;

							for (const split of splits) {
								innerNumberOfTimelines += traverse({
									...split,
									numberOfTimelines
								});
							}

							return innerNumberOfTimelines;
						}
					);
				}

				break;
			}

			// no default
		}
	}

	return traverse({
		currentManifold,
		numberOfTimelines,
		rowIndex: rowIndex + 1
	});
};

console.info(traverse({ currentManifold: manifold.map((row) => [...row]) }));
