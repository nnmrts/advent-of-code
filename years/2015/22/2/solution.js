import boss from "../_common/boss.js";
import play from "../_common/play.js";
import player from "../_common/player.js";

boss.cast({
	cost: 0,
	effect: {
		damage: 1,
		duration: Infinity,
		perTurn: true,
		perTurnOf: ["Player"]
	},
	name: "Eternal Poison"
});

const [leastManaSpent] = play(player, boss)
	.toSorted((manaSpentA, manaSpentB) => manaSpentA - manaSpentB);

console.info(leastManaSpent);
