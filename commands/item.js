module.exports = function(modules) {
	return {
		call: ["item", "price", "pc"],
		help: "::item [name] / Show market data of an item.",

		func: function(opts, command) {
			modules.item.market(
				command.args.join(" "),
				function(message) {
					modules.chat.sendMessage(opts, message);
				}
			);
		}
	};
}