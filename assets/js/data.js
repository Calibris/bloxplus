var collectible = new Audio('assets/audios/collectible.mp3');
var item = new Audio('assets/audios/item.mp3');
var updated = new Audio('assets/audios/updated.mp3');
var message = new Audio('assets/audios/message.mp3');
var trade = new Audio('assets/audios/trade.mp3');
var info = new Object();
var links = new Object();
var user = new Object();
var recent = new Object();
var scan = new Object();
var scanned = false;

$.getJSON('http://bloxplus.com/data.json').success(function(data) {
	links.recent = data["links"]["recent"];
	links.tshirts = data["links"]["tshirts"];
	links.search = data["links"]["search"];
	info.time = data["notifier"]["interval"];

	$.get('https://www.bloxcity.com/users/search/').success(function(data) {
		if ($('.dropdown-button1', data).length > 0) {
			user.name = $('.dropdown-button1[style="font-size:16px;"]', data).text().split("arrow_drop_down").join("").trim();
			user.id = $('a:contains("Profile")', data).attr('href').split("https://www.bloxcity.com/users/").join("").split("/" + user.name + "/").join("");
			user.on = true;
		} else {
			user.on = false;
		}
		scanned = true;
	})
});