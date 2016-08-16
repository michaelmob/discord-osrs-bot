module.exports = function(bot) {
	return {
		/*
		* Send Message
		*/
		sendMessage: function(opts) {
			var messages = Array.prototype.slice.call(arguments, 1);
			opts["message"] = "<@" + opts["userID"] + "> " + messages.join(" ");
			bot.sendMessage(opts);
		},

		/*
		* Send Message with a Player Prefix
		*/
		sendMessagePlayer: function(opts, player) {
			var messages = Array.prototype.slice.call(arguments, 1);
			this.sendMessage(
				opts, "[*" + player.title() + "*] " + messages.slice(1).join(" ")
			);
		}
	};
}