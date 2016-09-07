var Request = require("request");
var Fuse = require("fuse.js");

module.exports = function() {
	// Convert names.json from an associative dictionary to a list of dictionaries
	// with its 'id' as an element
	var _items = require("../names.json");
	var items = [];

	for(var item in _items) {
		if (_items[item]["name"].slice(-2) == " 0")
			continue;  // Ignore broken Barrows items

		items.push({
			"id": item, "name": _items[item]["name"], "store": _items[item]["store"]
		});
	}

	var fuzzy = new Fuse(items, { keys: ["name"] });

	return {
		/*
		* Fuzzily search for item from items array
		*/
		get: function(value) {
			return fuzzy.search(value)[0];
		},

		/*
		* Fetch data from Grand Exchange API
		*/
		grandExchangeData: function(item, callback) {
			// Item information
			var itemAmount = this._itemAmount(item);
			var item = itemAmount[0];
			var amount = itemAmount[1];

			// Fuzzy search, find item
			item = this.get(item);
			if(item == undefined)
				return callback("Item not found!");

			// Do not fetch if item data has already been fetched
			var currentDate = new Date();
			if(item["expires"] > currentDate)
				return callback(item);

			// Fetch market data
			var url = "http://services.runescape.com/m=itemdb_oldschool/" +
				"api/catalogue/detail.json?item=" + item["id"];
			var _this = this;

			Request.get(url, function(err, resp, body) {
				if(resp.statusCode == 404 || resp.statusCode == 500)
					return;  // Fetch failed

				// Item data from API
				var result = JSON.parse(body)["item"];

				// Calculate expiration time; 2 hours after now
				var expirationDate = new Date(currentDate);
				expirationDate.setHours(currentDate.getHours() + 2);

				// Set values for item
				item["alch"] = parseInt(Math.round(item["store"]) * .6);
				item["price"] = _this._expandNumber(result["current"]["price"]);
				item["amount"] = amount;
				item["description"] = result["description"];
				item["icon"] = result["icon_large"];
				item["expires"] = expirationDate;

				return callback(item);
			});
		},
		
		/*
		* PRIVATE / Remove all non-numeric characters
		*/
		_numbersOnly: function(number) {
			return number.replace(/[^0-9.]/g, "");
		},

		/*
		* PRIVATE / Expand number such as "3.4m" to "3400000" 
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
		* PRIVATE / Split by asterisk to get Item name and Item amount
		*/
		_itemAmount: function(item) {
			var values = item.replace(" x ", "*").split("*");
			return [values[0], parseInt(values[1]) || 1];
		}
	};
}