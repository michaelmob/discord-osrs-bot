module.exports = function(request, fuse) {
	var dictItems = require("./names.json");
	var listItems = [];

	for(var item in dictItems) {
		// Ignore broken Barrow's items
		if (dictItems[item]["name"].slice(-2) == " 0")
			continue;

		listItems.push({
			"id": item,
			"name": dictItems[item]["name"],
			"store": dictItems[item]["store"]
		});
	}

	var fuzzy = new fuse(listItems, { keys: ["name"] });

	return {
		/*
		* Get Item with fuzzy search
		*/
		get: function(item) {
			return fuzzy.search(item)[0];
		},

		/*
		* Fetch data from Grand Exchange API
		*/
		grandExchangeData: function(item, callback) {
			itemAmount = this._itemAmount(item);
			item = itemAmount[0];
			amount = itemAmount[1];

			// Fuzzy search, find item
			item = this.get(item);
			if(item == undefined)
				return callback("Item not found!");

			// Fetch market data
			url = "http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=" + item["id"];
			_this = this;

			request.get(url, function(err, resp, body) {
				if(resp.statusCode == 404 || resp.statusCode == 500)
					return;

				var result = JSON.parse(body)["item"];
				item["alch"] = parseInt(Math.round(item["store"]) * .6);
				item["price"] = _this._expandNumber(result["current"]["price"]);
				item["amount"] = amount;
				item["description"] = result["description"];
				item["icon"] = result["icon_large"];

				return callback(item);
			});
		},

		/*
		* Fetch data from RSBuddy API
		*/
		rsbuddyData: function(item, callback) {
			var itemAmount = this._itemAmount(item);
			var amount = itemAmount[1];
			item = itemAmount[0];

			// Fuzzy search, find item
			item = this.get(item);
			if(item == undefined)
				return callback("Item not found!");

			// Fetch market data
			var url = "https://api.rsbuddy.com/grandExchange?a=guidePrice&i=" + item["id"];
			var _this = this;
			request.get(url, function(err, resp, body) {
				if(resp.statusCode == 404 || resp.statusCode == 500)
					return;

				var result = JSON.parse(body);
				item["alch"] = parseInt(Math.round(item["store"]) * .6);
				item["price"] = result["overall"];
				item["amount"] = amount;
				item["icon"] = "http://cdn.rsbuddy.com/items/" + item["id"] + ".png"
				item["buying"] = result["buying"];
				item["selling"] = result["selling"];

				return callback(item);
			});
		},

		/*
		* Remove all non-numeric characters
		*/
		_numbersOnly: function(number) {
			return number.replace(/[^0-9]/g, "");
		},

		/*
		* Expand number such as "3.4m" to "3400000" 
		*/
		_expandNumber: function(number) {
			var numberStr = number.toString().trim().toLowerCase();
			number = this._numbersOnly(numberStr);

			// Multiply number by millions
			if (numberStr.includes("m"))
				number = number * 1000000;

			// Multiply number by thousands
			else if (numberStr.includes("k"))
				number = number * 1000;

			return parseFloat(number);
		},

		/*
		* Split by asterisk to get Item name and Item amount
		*/
		_itemAmount: function(item) {
			var values = item.replace(" x ", "*").split("*");
			return [values[0], parseInt(values[1]) || 1];
		}
	};
}