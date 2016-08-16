/*
* About the bot
*/
module.exports = function(modules) {
	return {
		call: ["about"],
		help: "::about / About the bot.",
		
		func: function(opts, command) {
			modules.chat.sendMessage(opts,
				"\n**Oldschool Runescape Discord Bot**\n",
				"Version:", modules.bot.version, "\n",
				"Source: https://github.com/thetarkus/discord-osrs-bot/"
			);
		}
	};
}