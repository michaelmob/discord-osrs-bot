module.exports = function(modules) {
	return {
		call: ["about"],
		help: "::about / About the bot.",
		
		func: function(opts, command) {
			modules.chat.sendMessage(opts,
				"https://github.com/thetarkus/discord-osrs-bot/"
			);
		}
	};
}