var page = require("webpage").create();

page.settings.userAgent = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:49.0) Gecko/20100101 Firefox/49.0";
page.open("https://rsbuddy.com/exchange/names.json", function(status) {
	setTimeout(function() {
		console.log(page.plainText);
		phantom.exit();
	}, 6000);
});