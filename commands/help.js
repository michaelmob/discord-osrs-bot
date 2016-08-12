module.exports = function(modules) {
	startText = "List of Commands:\n ```";
	endText = "```"

	return {
		call: ["help"],
		help: "::help / List all commands.",
		func: function(opts, command) {
			modules.chat.sendMessage(opts, startText + modules.helpText + endText);
		}
	};
}