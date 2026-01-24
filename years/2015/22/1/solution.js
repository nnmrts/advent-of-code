import boss from "../_common/boss.js";
import play from "../_common/play.js";
import player from "../_common/player.js";

const [leastManaSpent] = play(player, boss)
	.toSorted((manaSpentA, manaSpentB) => manaSpentA - manaSpentB);

console.info(leastManaSpent);
