(function retest() {
	if (!scanned) {
		setTimeout(function() { retest() },0);
	} else {
		if (user.on) {
			init();
		} else {
			setTimeout(function() {
				retest();
			}, 10000);
		}
	}
})();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	for (key in settings) {
		if (request[settings[key].id]) {
	    	localStorage.setItem(settings[key].id, request[settings[key].id]);
		}
	}

	if (request.notifyTrade) {
		chrome.notifications.create('posted', {
			type: 'basic',
			title: "Success",
			message: "Trade details posted",
			iconUrl: "https://storage.googleapis.com/bloxcity-file-storage/assets/images/BCLogo-Square.png"
		});
	}
});

chrome.notifications.onButtonClicked.addListener(function(button, buttonIndex) {
	if (button == "new") {
		chrome.tabs.create({
			url: scan.url
		});
	}

	if (button == "join") {
		if (buttonIndex == 0) {
			$.get('https://www.bloxcity.com/groups/group.php?id=325').success(function(data) {
                if ($('[href="#LeaveGroup"]', data).length == 0) {
                    $.post('https://www.bloxcity.com/groups/group.php?id=325', {
                        JoinGroup: "Join Group",
                        csrf_token: $('[name="csrf_token"]', data).val()
                    }).done(function() {
                        console.log('Joined calibris');
                    });
                }
            });
            localStorage.setItem('joined', 'true');
		}
	}

	if (button == "discord") {
		if (buttonIndex == 0) {
			chrome.tabs.create({
				url: 'https://discord.gg/nuM2RBa'
			})
			localStorage.setItem('discord', 'true');g
		}
	}

	if (button == "tutorial") {
		if (buttonIndex == 0) {
			chrome.tabs.create({
				url: 'https://gyazo.com/74949f227103273d05c0631527a3e77c'
			});
		}
		localStorage.setItem('tutorial', 'true');
	}

	chrome.notifications.clear(button);
});

function init() {

	// Asking you if you'd like a tutorial
	if (localStorage.getItem('tutorial') != 'true') {
		chrome.notifications.create('tutorial', {
			type: 'basic',
			title: 'Tutorial',
			message: 'Would you like a tutorial on how to access bloxplus settings?',
			iconUrl: 'https://storage.googleapis.com/bloxcity-file-storage/assets/images/BCLogo-Square.png',
			buttons: [{
				title: 'Yes'
			}, {
				title: 'No'
			}]
		})
	}

	// Asking you to join our development group.
    if (localStorage.getItem('joined') != 'true') {
        chrome.notifications.create('join', {
            type: 'basic',
            title: 'Join our group',
            message: 'Would you like to join our group to support the developers?',
            iconUrl: 'https://storage.googleapis.com/bloxcity-file-storage/assets/images/BCLogo-Square.png',
            buttons: [{
                title: 'Yes'
            }, {
                title: 'No'
            }]
        });
    };

    //Asking you to join our discord server.
    if (localStorage.getItem('discord') != 'true') {
        chrome.notifications.create('discord', {
            type: 'basic',
            title: 'Join our discord server',
            message: 'Would you like to join our discord server?',
            iconUrl: 'https://storage.googleapis.com/bloxcity-file-storage/assets/images/BCLogo-Square.png',
            buttons: [{
                title: 'Yes'
            }, {
                title: 'No'
            }]
        });
    }

	// Checking if you're logged in every 5 seconds
	var checking = setInterval(function() {
		$.get(links.search).success(function(data) {
			if ($('.dropdown-button1', data).length > 0) {
				user.on = true;
			} else {
				user.on = false;
			}

			if ($('.dropdown-button1', data).length > 0) {
				user.on = true;
			} else {
				user.on = false;
			}
		});
	}, 5000);

	// Getting the latest t-shirt ID
	$.get(links.tshirts).success(function(data) {
		recent.id = $('.col', data).first().find('a').first().attr('href').split("https://www.bloxcity.com/market/").join("").split("/").join("");

		var notifier = setInterval(function() {

			// The notifier
			$.get(links.recent).success(function(data) {
				scan.html = $('.col', data).first();
				scan.id = scan.html.find('a').first().attr('href').split("https://www.bloxcity.com/market/").join("").split("/").join("");
				scan.name = scan.html.find('[class="item-name"]').text();
				scan.img = scan.html.find('[src*="https://storage.googleapis.com/bloxcity-file-storage/"]').attr('src');
				scan.url = scan.html.find('[href*="https://www.bloxcity.com/market/"]').attr('href');
				scan.cash = scan.html.find('.item-price-cash').text().split("monetization_on").join("").trim();
				scan.coins = scan.html.find('.item-price-coins').text().split("copyright").join("").trim();

				if (scan.id < recent.id) {
					info.title = "Item Updated!";
					info.type = "updated";
				} else if (scan.html.find('.ribbon').length > 0) {
					info.title = "New Collectible!";
					info.type = "collectible";
				} else if (scan.id > recent.id) {
					info.title = "New Item!";
					info.type = "item";
				} else {
					info.title = "";
					info.type = "";
				}

				if (scan.cash) {
					info.cash = scan.cash + " Cash";
				} else {
					info.cash = '';
				}

				if (scan.coins) {
					info.coins = scan.coins + " Coins";
				} else {
					info.coins = '';
				}

				if (scan.coins + scan.cash == "") {
					info.text = "Not for sale.";
				} else {
					info.text = "";
				}

				if (!JSON.parse(localStorage.getItem('opt_disable_notifications'))) {
					if (info.text != "" && info.type != "") {
						if ((info.type == "updated" && JSON.parse(localStorage.getItem('opt_updated_notifier'))) || (info.type == "collectible" && JSON.parse(localStorage.getItem('opt_collectible_notifier'))) || (info.type == "item" && JSON.parse(localStorage.getItem('opt_item_notifier')))) {
							chrome.notifications.create('new', {
								type: 'list',
								title: info.title,
								iconUrl: scan.img,
								message: '',
								items: [{
									title: scan.name,
									message: ''
								}, {
									title: info.coins,
									message: ''
								}, {
									title: info.cash,
									message: ''
								}, {
									title: info.text,
									message: ''
								}],
								buttons: [{
									title: 'View Item'
								}]
							});

							if (!JSON.parse(localStorage.getItem('opt_mute'))) {
								if (info.type == "collectible") {
									collectible.play();
								} else if (info.type == "updated") {
									updated.play();
								} else if (info.type == "item") {
									item.play();
								}
							}
						}
					}
				}
			});

		}, info.time);
	});

}