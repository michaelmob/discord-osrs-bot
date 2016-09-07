/*
* Generate a random number between two specified integers.
*/
module.exports = function(modules) {
	return {
		alias: ["roll"],
		example: "::roll [int[-int]]",
		description: "Random number generator.",
		
		func: function(opts, command) {
			// Combine args to be split by hyphens, so that both
			// "::roll 1-100" and "::roll 1 100" can be both be read
			var values = command.args.join("-").split("-");

			// Parse values
			var fromValue = parseInt(values[0]) || 1;
			var toValue = parseInt(values[1]) || 100;

			// Single input; 1-[value]
			if (values.length < 2) {
				toValue = fromValue;
				fromValue = 1;
			}

			// Switch numbers if fromValue is larger than toValue
			else if (toValue != 0 && fromValue > toValue) {
				fromValue = [toValue, toValue = fromValue][0];
			}

			// Process and send result
			var result = modules.utils.randomNumber(fromValue, toValue);

			modules.chat.sendMessage(opts,
				"Rolling:", fromValue + "-" + toValue,
				"| Result:", "**" + result + "**"
			);
		}
	};
}