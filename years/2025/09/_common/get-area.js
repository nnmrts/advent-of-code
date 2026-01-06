/**
 * @import { Coordinates2D } from "../../../_types/coordinates-2-d.doc.js";
 */

/**
 *
 * @param {Coordinates2D} pointA
 * @param {Coordinates2D} pointB
 */
const getArea = ([xA, yA], [xB, yB]) => (Math.abs(xA - xB) + 1) * (Math.abs(yA - yB) + 1);

export default getArea;
