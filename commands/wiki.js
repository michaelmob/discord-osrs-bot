/*
* Send a link to the 2007scape wiki page for an item
*/
module.exports = function(modules) {
	return {
		alias: ["wiki"],
		example: "::wiki [item name]",
		description: "Link to an item in the 2007 RuneScape Wiki.",
		
		func: function(opts, command) {
			command = command.args.join(" ");;
			name = command;
			
			var item = modules.item.get(command);
			if(item != undefined)
				name = item["name"]

			modules.chat.sendMessage(
				opts, "http://2007.runescape.wikia.com/wiki/" +
					name.replace(/\ /g, "_")
			);
		}
	};
}