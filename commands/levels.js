/*
* Fetch levels of a player
*/
module.exports = function(modules) {
	return {
		alias: ["levels", "level", "lvls", "lvl", "stats", "stat", "skills", "skill"],
		example: "::levels [player name] [skill [skill [skill...]]]",
		description: "Show skill levels of a player.",

		func: function(opts, command) {
			modules.player.get(command.args, function(playerName, skills) {
				// No skills returned means no players were found
				if(skills == false)
					return modules.chat.sendMessageUser(
						opts, playerName, "Player not found!"
					);

				var result = modules.player.skillsToString(skills);

				if (result.length < 1)
					return;

				modules.chat.sendMessageUser(
					opts, playerName, modules.player.skillsToString(skills)
				);
			});
		}
	};
}