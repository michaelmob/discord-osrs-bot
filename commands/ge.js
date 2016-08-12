module.exports = function(modules) {
	return {
		call: ["ge", "grandexchange"],
		help: "::ge [item] / Link to Grand Exchange's data for an item.",
		func: function(opts, command) {
			var item = modules.item.get(command.args.join(" "));
			if(item == undefined)
				return modules.chat.sendMessage(opts, "Item not found!");

			modules.chat.sendMessage(
				opts, "http://services.runescape.com/" +
					"m=itemdb_oldschool/x/viewitem?obj=" + item["id"]
			);
		}
	};
}