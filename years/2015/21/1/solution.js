import Party from "../../_common/party.js";
import bossStats from "../_common/boss-stats.js";
import loadouts from "../_common/loadouts.js";

const bestLoadout = loadouts
	.toSorted(({ cost: costA }, { cost: costB }) => costA - costB)
	.find((loadout) => {
		const boss = new Party(bossStats);

		const player = new Party({ hitPoints: 100 });

		player.equip(loadout);

		let turn = 1;

		while (boss.hitPoints > 0 && player.hitPoints > 0) {
			if (turn % 2 === 1) {
				player.attack(boss);
			}
			else {
				boss.attack(player);
			}

			turn += 1;
		}

		return player.hitPoints > 0;
	});

console.info(bestLoadout?.cost);
