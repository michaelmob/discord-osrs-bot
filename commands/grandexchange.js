/*
* Send a link to the grand exchange page for an item
*/
module.exports = function(modules) {
	return {
		alias: ["ge", "grandexchange"],
		example: "::ge [item name]",
		description: "Link to the grand exchange page for an item.",
		
		func: function(opts, command) {
			command = command.args.join(" ");
			
			var item = modules.item.get(command);
			modules.chat.sendMessage(
				opts, "http://services.runescape.com/m=itemdb_oldschool/viewitem?obj=" + item["id"]
			);
		}
	};
}