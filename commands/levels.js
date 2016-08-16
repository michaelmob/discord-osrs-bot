/*
* Fetch levels of a player
*/
module.exports = function(modules) {
	return {
		call: ["levels", "level", "lvls", "lvl", "stats", "stat", "skills", "skill"],
		help: "::levels [username] [skill [skill [skill...]]] / Show skill levels of a player.",

		func: function(opts, command) {
			modules.player.get(command.args, function(playerName, skills) {
				// No skills returned means no players were found
				if(skills == false)
					return modules.chat.sendMessagePlayer(
						opts, playerName, "Player not found!"
					);

				var result = modules.player.skillsToString(skills);

				if (result.length < 1)
					return;

				modules.chat.sendMessagePlayer(
					opts, playerName, modules.player.skillsToString(skills)
				);
			});
		}
	};
}