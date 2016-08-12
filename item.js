module.exports = function(request, fuse) {
	var dictItems = require("./names.json");
	var listItems = [];

	for(var item in dictItems) {
		listItems.push({
			"id": item,
			"name": dictItems[item]["name"],
			"store": dictItems[item]["store"]
		});
	}

	var fuzzy = new fuse(listItems, { keys: ["name"] });

	return {
		get: function(item) {
			return fuzzy.search(item)[0];
		},

		market: function(item, callback) {
			amount = 1;

			// Amount multiplication
			if (item.includes("*")) {
				item = item.split("*");
				amount = parseInt(item[1].trim() || 1);
				item = item[0];
			}

			// Fuzzy search, find item
			item = this.get(item);
			if(item == undefined)
				return callback("Item not found!");

			// Fetch market data
			_this = this;
			request.get(
				"https://api.rsbuddy.com/grandExchange?a=guidePrice&i=" + item["id"],
				function (error, response, body) {
					if(response.statusCode == 404 || response.statusCode == 500)
						return;

					return callback(
						_this._formatMarketData(item, JSON.parse(body), amount)
					);
				}
			);
		},

		_formatNumber: function(number) {
			return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
		},

		_formatMarketData: function(localItem, item, amount) {
			// Name
			var result = this._formatNumber(amount) + " x **" + localItem["name"] + "** ";

			// Image
			result += "http://cdn.rsbuddy.com/items/" + localItem["id"] + ".png \n";

			// Prices
			alchValue = this._formatNumber(Math.round(localItem["store"] * .6));
			buyValue = this._formatNumber(item["buying"] * amount);
			sellValue = this._formatNumber(item["selling"] * amount);
			averageValue = this._formatNumber(item["overall"] * amount);

			// Output
			result += "**Alch:** " + alchValue + " gp | ";
			result += "**Buy:** " + buyValue + " gp | ";
			result += "**Sell:** " + sellValue + " gp | ";
			result += "**Avg:** " + averageValue + " gp | ";

			return result;
		}
	};
}