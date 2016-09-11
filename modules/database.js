/*
* Database Module
*/
Fs = require("fs");
DatabaseFile = "database.json";

module.exports = function() {
	return {
		"help-text": "",
		data: {},

		/*
		* Load database from DatabaseFile
		*/
		load: function() {
			// Attempt to load database
			try {
				data = require("../" + DatabaseFile);
				JSON.parse(JSON.stringify(data));
				this.data = data;
			} catch (e) {
				console.log("Could not load database");
			}

			// Load Defaults
			var defaults = {
				"commands-received-count": 0,
				"talked-to-count": 0,
				"delete-count": 0,
			};

			var keys = Object.keys(defaults);

			for (var i = keys.length - 1; i >= 0; i--)
				if(!(keys[i] in this.data.statistics))
					this.data.statistics[keys[i]] = 0;
		},

		/*
		* Save database to DatabaseFile
		*/
		save: function() {
			Fs.writeFile("./" + DatabaseFile, JSON.stringify(this.data), function (err) {
				if (err) return console.log(err);
				console.log("Database saved at " + Date().toString());
			});
		},

		/*
		* Autosave database every 15 minutes
		*/
		autosave: function() {
			_this = this;
			setInterval(function() {
				_this.save();
			}, 900000);
		}
	};
};