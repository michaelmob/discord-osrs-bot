module.exports = function(bot) {
	return {
		sendMessage: function(opts, message) {
			opts["message"] = "<@" + opts["userID"] + "> " + message;
			bot.sendMessage(opts);
		},

		sendMessagePlayer: function(opts, player, message) {
			this.sendMessage(opts, "[*" + player.title() + "*] " + message);
		}
	};
}