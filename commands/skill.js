module.exports = function(modules) {

	var skills = [
		["attack", "atk", "att"],
		["strength", "str"],
		["defence", "def"],
		["ranged", "range", "rng"],
		["prayer", "pray", "pry"],
		["magic", "mage", "mag", "mgc"],
		["runecrafting", "runecraft", "rc"],
		["hitpoints", "hit", "hits", "hp"],
		["crafting", "craft"],
		["mining", "mine"],
		["smithing", "smith"],
		["fishing", "fish"],
		["cooking", "cook"],
		["firemaking", "firemake", "fm"],
		["woodcutting", "woodcut", "wc"],
		["agility", "agil", "agl"],
		["herblore", "herblaw", "herb"],
		["thieving", "thieve", "thiev"],
		["fletching", "fletch"],
		["slayer", "slay"],
		["farming", "farm"],
		["construction", "con"],
		["hunter", "hunt", "hunting"],
		["total", "ttl"],
		["combat", "cmb"],
	];

	var nameToSkill = function(name) {
		for (var i = 0; i < skills.length; i++) {
			for (var j = 0; j < skills[i].length; j++) {
				if(skills[i][j].indexOf(name) > -1)
					return skills[i][0];
			}
		}
		return null;
	};

	calls = [];
	
	for (var i = 0; i < skills.length; i++) {
		for (var j = 0; j < skills[i].length; j++) {
			calls.push(skills[i][j]);
		}
	}

	return {
		call: calls,
		help: "::[skill] [username] / Show skill of a player.",

		func: function(opts, command) {
			var playerName = command.args.join(" ");
			var skillName = nameToSkill(command.value);
			modules.player.getEx(playerName, [skillName], function(playerName, skills) {
				if(skills == false)
					return modules.chat.sendMessagePlayer(
						opts, playerName, "Player not found!"
					);

				var f = modules.utils.formatNumber;
				
				modules.chat.sendMessagePlayer(
					opts, playerName,
					"**" + skillName.title() + " Level:** " + f(skills[skillName][0]) + 
					" | **Rank:** " + f(skills[skillName][1]) +
					" | **EXP:** " + f(skills[skillName][2])
				);
			});
		}
	};
}