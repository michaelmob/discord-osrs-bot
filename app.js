/* Imports */
var Request = require("request");
var Discord = require("discord.io");
var Fuse = require("fuse.js");
var Fs = require("fs");


/* User Variables */
var Variables = require("./variables")();


/* Bot */
var Bot = new Discord.Client({
	token: Variables.TOKEN,
	autorun: true
});


/* Modules */
var Modules = {
	utils: require("./modules/utils.js")(),
	chat: require("./modules/chat.js")(Bot),
	player: require("./modules/player.js")(),
	item: require("./modules/item.js")(),
	database: require("./modules/database.js")()
};


/* Database */
Modules.database.data.statistics = {};
Modules.database.data.channels = {};
Modules.database.load();
Modules.database.autosave();


/* Commands */
var Commands = {};
var CommandFiles = Fs.readdirSync("commands").filter((f) => f.endsWith(".js"));

// Loop through each js file in ./commands/ and import it as a command
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
	for (var j = func.alias.length - 1; j >= 0; j--) {
		Commands[func.alias[j]] = func;
	}

	Modules.database["help-text"] += func.example + " -- " + func.description + "\n";
}

// Get all commands and aliases 
CommandsList = Object.keys(Commands);


/* Listeners */
Bot.on("ready", function() {
	console.log(Bot.username + " - (" + Bot.id + ")");
});


// Normal Message
Bot.on("message", function(user, userID, channelID, message, event) {
	// Command has prefix
	if(!message.startsWith("::"))
		return;

	// Parse
	var command = Modules.utils.parseCommand(message);

	// Validate
	if (CommandsList.indexOf(command.value) < 0)
		return;

	// Run
	Commands[command.value].func({
		to: channelID, userID: userID
	}, command);

	// Create dictionary for ChannelID
	if(!Modules.database.data.channels[channelID]) {
		Modules.database.data.channels[channelID] = {};
		Modules.database.data.statistics["talked-to-count"] += 1
	}

	// Delete message if option is set
	if(Modules.database.data.channels[channelID]["delete-messages"] == true) {
		Bot.deleteMessage({
			channelID: channelID, messageID: event.d.id
		});
		Modules.database.data.statistics["delete-count"] += 1
	}

	Modules.database.data.statistics["commands-received-count"] += 1
});