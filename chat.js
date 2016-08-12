module.exports = function(bot) {
	return {
		sendMessage: function(opts, message) {
			opts["message"] = "<@" + opts["userID"] + "> " + message;
			bot.sendMessage(opts);
		}
	};
}