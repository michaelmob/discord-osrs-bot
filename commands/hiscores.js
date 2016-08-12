module.exports = function(modules) {
	return {
		call: ["hiscore", "hiscores"],
		help: "::hiscore [username] / Link to an item in the 2007 RuneScape Wiki.",
		
		func: function(opts, command) {
			modules.chat.sendMessage(
				opts, "http://services.runescape.com/m=hiscore_oldschool/" +
					"hiscorepersonal.ws?user1=" + command.args.join("+")
			);
		}
	};
}