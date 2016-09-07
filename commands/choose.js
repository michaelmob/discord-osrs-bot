/*
* Choose random index from a list that is split by commas
*/
module.exports = function(modules) {
	return {
		alias: ["choose", "choice", "pick", "select"],
		example: "::choose [value][, [value], [value...]]",
		description: "Choose randomly from list.",
		
		func: function(opts, command) {
			if(command.args.length < 1)
				return;

			var choices = command.args.join(" ").split(",");
			var index = modules.utils.randomNumber(0, choices.length - 1);

			modules.chat.sendMessage(opts,
				"I choose:", "**" + choices[index].trim() + "**"
			);
		}
	};
}