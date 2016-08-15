module.exports = function(request) {
	var skillsList = [
		"total", "attack", "defence", "strength", "hitpoints", "ranged", "prayer",
		"magic", "cooking", "woodcutting", "fletching", "fishing", "firemaking",
		"crafting", "smithing", "mining", "herblore", "agility", "thieving",
		"slayer", "farming", "runecrafting", "hunter", "construction",
		-1, -1, -1, "combat"
	];

	String.prototype.title = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	return {
		getEx: function(playerName, wantedSkills, callback) {
			// Show combat skills if none were specified
			if(wantedSkills.length < 1) {
				wantedSkills = [
					"attack", "defence", "strength", "hitpoints",
					"ranged", "prayer", "magic", "combat", "total"
				];
			}
			
			_this = this;
			request.get(
				"http://services.runescape.com/m=hiscore_oldschool/" + 
					"index_lite.ws?player=" + playerName.replace(/\ /g, "+"),

				function (error, response, body) {
					if(response.statusCode == 404 || response.statusCode == 500)
						return callback(playerName, false);

					// Split apart skills by line; Rank/Level/EXP
					var tokens = body.trim().split("\n");

					// Add combat to tokens; 0,Level,0
					tokens.push("-1," + _this.getCombat(tokens) + ",-1");
					var skills = { };

					// Wanted Skills
					for (var i = 0; i < wantedSkills.length; i++) {
						// Get skills index
						index = skillsList.indexOf(wantedSkills[i]);
						if (index < 0)
							continue;

						// Get skill info from tokens at skill's index
						var skill = tokens[index].split(",");

						// Add to skills
						skills[wantedSkills[i]] = [
							parseFloat(skill[1]), // Level
							parseInt(skill[0]), // XP
							parseInt(skill[2]), // Rank
						];
					}

					return callback(playerName, skills);
				}
			);
		},

		get: function(args, callback) {
			return this.getEx(
				this._findPlayerName(args),
				args.slice(playerName.split(" ").length),
				callback
			);
		},

		skillsToString: function(skills) {
			var output = "";

			for (var skill in skills)
				output += "**" + skill.title() + ":** " +
					skills[skill][0].toString() + " | ";

			return output.slice(0, -3);
		},

		getCombat: function(tokens) {
			var getLevel = function(name) {
				return parseInt(
					tokens[skillsList.indexOf(name)].split(",")[1]
				);
			};

			return this._calcCombat(
				getLevel("attack"), getLevel("defence"),
				getLevel("strength"), getLevel("hitpoints"),
				getLevel("ranged"), getLevel("prayer"),
				getLevel("magic")
			);
		},

		_calcCombat: function(a, d, s, h, r, p, m) {
			// http://2007.runescape.wikia.com/wiki/Combat_level
			return ((0.25 * (d + h + Math.floor(p / 2))) + (Math.max(
				a + s, // Melee
				Math.floor(r / 2) + r, // Ranged
				Math.floor(m / 2) + m // Melee
			) * 0.325)).toFixed(1);
		},

		_findPlayerName: function(args) {
			searching = true;
			playerName = args[0];

			// Keep adding onto playerName as long as
			// next element is not a skill name
			for (var i = 1; i < args.length; i++) {
				if (!searching)
					return playerName.trim();

				if(skillsList.indexOf(args[i]) < 0) {
					playerName += " " + args[i];
					continue;
				}

				searching = false;
			}

			return playerName.trim();
		}
	};
}