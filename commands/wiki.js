module.exports = function(modules) {
	return {
		call: ["wiki"],
		help: "::wiki [item] / Link to an item in the 2007 RuneScape Wiki.",
		
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