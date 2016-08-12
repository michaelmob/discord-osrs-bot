module.exports = function(request) {
	var skillsList = [
		"total", "attack", "defence", "strength", "hitpoints", "ranged", "prayer",
		"magic", "cooking", "woodcutting", "fletching", "fishing", "firemaking",
		"crafting", "smithing", "mining", "herblore", "agility", "thieving",
		"slayer", "farming", "runecrafting", "hunter", "construction",
	];

	String.prototype.title = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	return {
		get: function(args, callback) {
			var username = this._findUsername(args);
			var wantedSkills = args.slice(username.split(" ").length);

			if(wantedSkills.length < 1) {
				wantedSkills = [
					"attack", "defence", "strength", "hitpoints",
					"ranged", "prayer", "magic", "combat", "total"
				];
			}

			_this = this;
			request.get(
				"http://services.runescape.com/m=hiscore_oldschool/" + 
					"index_lite.ws?player=" + username.replace(/\ /g, "+"),

				function (error, response, body) {
					if(response.statusCode == 404 || response.statusCode == 500)
						return callback(false);

					var tokens = body.split("\n");

					// Skills
					var skills = { };

					// Combat
					if(wantedSkills.indexOf("combat") > 0) {
						var skillLevel = function(skill) {
							return parseInt(
								tokens[skillsList.indexOf(skill)].split(",")[1]
							);
						};

						skills["combat"] = [_this.calcCombat(
							skillLevel("attack"),
							skillLevel("defence"),
							skillLevel("strength"),
							skillLevel("hitpoints"),
							skillLevel("ranged"),
							skillLevel("prayer"),
							skillLevel("magic")
						), 0, 0];
					}

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
							parseInt(skill[1]), // Level
							parseInt(skill[0]), // XP
							parseInt(skill[2]), // Rank
						];
					}

					return callback(skills);
				}
			);
		},

		skillsToString: function(skills) {
			var output = "";

			for (var skill in skills)
				output += "**" + skill.title() + ":** " +
					skills[skill][0].toString() + " | ";

			if (output.length > 2)
				output = output.slice(0, -3);

			return output;
		},

		calcCombat: function(a, d, s, h, r, p, m) {
			// http://2007.runescape.wikia.com/wiki/Combat_level
			return ((0.25 * (d + h + Math.floor(p / 2))) + (Math.max(
				a + s, // Melee
				Math.floor(r / 2) + r, // Ranged
				Math.floor(m / 2) + m // Melee
			) * 0.325)).toFixed(1);
		},

		_findUsername: function(args) {
			searching = true;
			username = args[0];

			// Keep adding onto username as long as
			// next element is not a skill name
			for (var i = 1; i < args.length; i++) {
				if (!searching)
					return username.trim();

				if(skillsList.indexOf(args[i]) < 0) {
					username += " " + args[i];
					continue;
				}

				searching = false;
			}

			return username.trim();
		}
	};
}