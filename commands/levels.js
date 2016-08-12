module.exports = function(modules) {
	return {
		call: ["levels", "level", "lvls", "lvl", "stats", "stat"],
		help: "::levels [username] [levels] / Show levels of a player.",

		func: function(opts, command) {
			modules.player.get(command.args, function(skills) {
				var result = modules.player.skillsToString(skills);

				if (result.length < 1)
					return;

				modules.chat.sendMessage(
					opts, modules.player.skillsToString(skills)
				);
			});
		}
	};
}