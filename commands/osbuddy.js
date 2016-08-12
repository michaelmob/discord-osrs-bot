module.exports = function(modules) {
	return {
		call: ["osbuddy"],
		help: "::osbuddy [item] / Link to RSBuddy's data for an item.",
		
		func: function(opts, command) {
			var item = modules.item.get(command.args.join(" "));
			if(item == undefined)
				return modules.chat.sendMessage(opts, "Item not found!");

			modules.chat.sendMessage(
				opts, "https://rsbuddy.com/exchange?id=" + item["id"]
			);
		}
	};
}