module.exports = function(modules) {
	return {
		call: ["choose", "choice", "pick", "select"],
		help: "::choose [val1], [val2], [val3...] / Choose randomly from list",
		
		func: function(opts, command) {
			if(command.args.length < 1)
				return;

			var choices = command.args.join(" ").split(",");
			var index = modules.utils.randomNumber(0, choices.length - 1);

			modules.chat.sendMessage(opts, "I choose: " +
				"**" + choices[index].trim() + "**"
			);
		}
	};
}