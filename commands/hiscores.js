/*
* Send a link to a player's hiscores page
*/
module.exports = function(modules) {
	return {
		alias: ["hiscore", "hiscores"],
		example: "::hiscore [player name]",
		description: "Link to a player's hiscores page.",
		
		func: function(opts, command) {
			modules.chat.sendMessage(
				opts, "http://services.runescape.com/m=hiscore_oldschool/" +
				"hiscorepersonal.ws?user1=" + command.args.join("+")
			);
		}
	};
}