/*
* Send a link to the OSBuddy page for an item
*/
module.exports = function(modules) {
	return {
		alias: ["osbuddy", "osb"],
		example: "::osbuddy [item name]",
		description: "Link to the RSBuddy's market site for an item.",
		
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