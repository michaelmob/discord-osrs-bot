module.exports = function(modules) {
	return {
		call: ["roll"],
		help: "::roll [int[-int]] / Random number generator.",
		
		func: function(opts, command) {
			var val1 = parseInt(command.args[0] || 100);
			var val2 = 0;

			if(command.args.length > 1)
				val2 = parseInt(command.args[1]);
			else {
				val2 = val1;
				val1 = 0;
			}

			modules.chat.sendMessage(opts, "Rolling: " + val1 + "-" + val2 +
				" | Result: **" + modules.utils.randomNumber(val1, val2) + "**"
			);
		}
	};
}