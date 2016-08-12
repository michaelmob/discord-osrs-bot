module.exports = function(bot) {
	return {
		formatNumber: function(number) {
			return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
		},

		randomNumber: function(minimum, maximum) {
			return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
		},

		parseCommand: function(message) {
			message = message.substring(2).split(" ");
			args = message.slice(1);

			return {
				value: message[0],
				args: args,
				arg: args[args.length - 1]
			};
		}
	};
}