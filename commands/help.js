/*
* Send a link to the Grand Exchange's website for an item
*/
module.exports = function(modules) {
	startText = "\n**List of Commands:** ```";
	endText = "```"

	return {
		call: ["help"],
		help: "::help / List all commands.",
		func: function(opts, command) {
			modules.chat.sendMessage(
				opts, startText + modules.helpText + endText
			);
		}
	};
}