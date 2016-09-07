/*
* Show market data for an oldschool item
*/
module.exports = function(modules) {

	/* Format number and add a "gp" postfix */
	var formatGp = function(number) {
		return modules.utils.formatNumber(number) + "gp";
	};

	/* Item's Value with optional amount */
	var itemValue = function(value, amount) {
		var result = formatGp(value);

		if(amount > 1) {
			result += " [x " + amount.toString() + " = ";
			result += formatGp(value * amount) + "]";
		}

		return result;
	};

	return {
		alias: ["item", "price", "pc"],
		example: "::item [item name]",
		description: "Show grand exchange data for an item.",

		func: function(opts, command) {
			var item = command.args.join(" ");

			modules.item.grandExchangeData(item, function(data) {
				modules.chat.sendMessage(opts,
					data["icon"] + "\n\n",
					"**" + data["name"] + "**",
					"*" + data["description"] + "*", "\n\n",
					
					"**Price:**", itemValue(data["price"], data["amount"]), "\n",
					"**Alch:**", itemValue(data["alch"], data["amount"])
				);
			});
		},
	}

}