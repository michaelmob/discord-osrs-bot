// Requirements
var Discord = require("discord.io");
var Request = require("request");
var Fuse = require("fuse.js");
var Fs = require("fs");

// User Variables
var Variables = require("./variables")();

// Bot
var Bot = new Discord.Client({
	token: Variables.TOKEN,
	autorun: true
});

// Modules
var Modules = {
	utils: require("./utils.js")(),
	chat: require("./chat.js")(Bot),
	player: require("./player.js")(Request),
	item: require("./item.js")(Request, Fuse),
	helpText: ""
}

// Commands
var CommandFiles = Fs.readdirSync("commands").filter((f) => f.endsWith(".js"));
var CommandsList = [];
var Commands = {};

for (var i = CommandFiles.length - 1; i >= 0; i--) {
	// Import
	var name = CommandFiles[i].slice(0, -3);
	var func = require("./commands/" + CommandFiles[i]);

	// Validate
	if(!(func instanceof Function))
		continue;

	// Evaluate
	var func = func(Modules);

	// Add calls to Commands
	for (var j = func.call.length - 1; j >= 0; j--) {
		Commands[func.call[j]] = func;
	}

	Modules["helpText"] += func.help + "\n";
}

CommandsList = Object.keys(Commands);

// Listeners
Bot.on("ready", function() {
	console.log(Bot.username + " - (" + Bot.id + ")");
});

Bot.on("message", function(user, userID, channelID, message, event) {
	if(!message.startsWith("::"))
		return; // Not a valid command

	var command = Modules.utils.parseCommand(message);

	if (CommandsList.indexOf(command.value) < 0)
		return; // Not a valid command

	Commands[command.value].func({ to: channelID, userID: userID }, command);
});
