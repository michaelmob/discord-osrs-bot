/*
* Send a link to the Grand Exchange's website for an item
*/
module.exports = function(modules) {
	startText = "```";
	endText = "```"

	return {
		alias: ["help"],
		example: "::help",
		description: "List all of the bots commands.",

		func: function(opts, command) {
			modules.chat.sendPrivateMessage(
				opts, startText + modules.database["help-text"] + endText
			);
		}
	};
}