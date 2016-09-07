/*
* About the bot
*/
var package = require("../package.json");

module.exports = function(modules) {
	var stats = modules.database.data.statistics;
	return {
		alias: ["about"],
		example: "::about",
		description: "About the bot.",
		
		func: function(opts, command) {
			modules.chat.sendMessage(opts,
				"\n**Oldschool Runescape Discord Bot**\n",
				"Version:", package.version, "\n",
				"Source: https://github.com/thetarkus/discord-osrs-bot/", "\n\n",

				"I've talked to", stats["talked-to-count"], "people.\n",
				"I've received", stats["commands-received-count"], "commands.\n",
				"I've deleted", stats["delete-count"], "messages."
			);
		}
	};
}