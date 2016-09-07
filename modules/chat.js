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
		* Send Message with a user prefix
		*/
		sendMessageUser: function(opts, user) {
			var messages = Array.prototype.slice.call(arguments, 1);
			this.sendMessage(
				opts, "[*" + user.title() + "*] " + messages.slice(1).join(" ")
			);
		},

		/*
		* Send Private Message
		*/
		sendPrivateMessage: function(opts) {
			var messages = Array.prototype.slice.call(arguments, 1);
			opts["to"] = opts["userID"];
			opts["message"] = messages.join(" ");
			bot.sendMessage(opts);
		}
	};
};