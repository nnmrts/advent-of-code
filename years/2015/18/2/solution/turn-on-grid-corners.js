/**
 * @import { Grid } from "../../_types/grid.doc.js";
 * @import { WritableDeep } from "./turn-on-grid-corners/_exports.js";
 */

/**
 * @template {Grid} GridTemplate
 * @param {GridTemplate} grid
 */
const turnOnGridCorners = (grid) => {
	const currentGrid = /** @type {WritableDeep<GridTemplate>} */ (
		structuredClone(grid)
	);

	currentGrid[0][0] = 1;
	currentGrid[0][currentGrid[0].length - 1] = 1;
	currentGrid.at(-1)[0] = 1;
	currentGrid.at(-1)[currentGrid.at(-1).length - 1] = 1;

	return currentGrid;
};

export default turnOnGridCorners;
