/*
* Individual skill lookup for players
*/
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

	/* Search through 'skills' and find the name of the alias */
	var aliasToSkill = function(alias) {
		for (var i = 0; i < skills.length; i++)
			for (var j = 0; j < skills[i].length; j++)
				if(skills[i][j].indexOf(alias) > -1)
					return skills[i][0];
		return null;
	};

	aliases = [];
	
	for (var i = 0; i < skills.length; i++)
		for (var j = 0; j < skills[i].length; j++)
			aliases.push(skills[i][j]);

	return {
		alias: aliases,
		example: "::[skill] [player name]",
		description: "Show skill of a player.",

		func: function(opts, command) {
			var playerName = command.args.join(" ");
			var skillName = aliasToSkill(command.value);
			modules.player.getEx(playerName, [skillName], function(playerName, skills) {
				if(skills == false)
					return modules.chat.sendMessageUser(
						opts, playerName, "Player not found!"
					);

				var f = modules.utils.formatNumber;
				
				modules.chat.sendMessageUser(
					opts, playerName,
					"**" + skillName.title() + " Level:** " + f(skills[skillName][0]) + 
					" | **Rank:** " + f(skills[skillName][1]) +
					" | **EXP:** " + f(skills[skillName][2])
				);
			});
		}
	};
}