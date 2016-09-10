var functions = {
	/*
	* Remove any non-numeric character from a string of numbers
	*/
	numbersOnly: function(number) {
		return number.replace(/[^0-9]/g, "");
	},

	/*
	* Format number into readable text
	*/
	formatNumber: function(number) {
		return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
	},

	/*
	* Generate random number from minimum to maximum
	*/
	randomNumber: function(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
	},

	/*
	* Parse command and return an array of 'value', 'args', and 'arg'
	*
	* 'value' is the command name
	* 'args' is a list of all arguments
	* 'arg' is the last argument in 'args'
	*/
	parseCommand: function(message) {
		message = message.trim().substring(2).split(" ");
		args = message.slice(1);

		return {
			value: message[0],
			args: args,
			arg: args[args.length - 1]
		};
	}
};

module.exports = function(bot) {
	return functions;
}