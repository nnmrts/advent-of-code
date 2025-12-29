import manifold from "../_common/manifold.js";

const manifoldAfterBeam = structuredClone(manifold.map((row) => [...row]));

let splitCounter = 0;

for (const [rowIndex, row] of manifoldAfterBeam.entries()) {
	for (const [columnIndex, value] of row.entries()) {
		switch (value) {
			case ".": {
				const valueAbove = manifoldAfterBeam[rowIndex - 1]?.[columnIndex];

				switch (valueAbove) {
					case "S":
					case "|":
						manifoldAfterBeam[rowIndex][columnIndex] = "|";
						break;

					default:
						manifoldAfterBeam[rowIndex][columnIndex] = value;
						break;
				}

				break;
			}

			case "^": {
				const valueAbove = manifoldAfterBeam[rowIndex - 1]?.[columnIndex];

				if (valueAbove === "|") {
					if (columnIndex - 1 >= 0) {
						manifoldAfterBeam[rowIndex][columnIndex - 1] = "|";
					}

					if (columnIndex + 1 <= row.length - 1) {
						manifoldAfterBeam[rowIndex][columnIndex + 1] = "|";
					}

					if (row.length > 0) {
						splitCounter += 1;
					}
				}

				break;
			}

			default:
				manifoldAfterBeam[rowIndex][columnIndex] = value;
				break;
		}
	}
}

console.info(splitCounter);
