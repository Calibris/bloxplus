$.get('https://www.bloxcity.com/users/search/').success(function(data) {
	links.recent = "https://www.bloxcity.com/market/recent.php?ItemType=all&Page=1";
	links.tshirts = "https://www.bloxcity.com/market/recent.php?ItemType=tshirt&Page=1";
	links.search = "https://www.bloxcity.com/users/search/";
	links.messages = "https://www.bloxcity.com/account/messages/";
	links.trades = "https://www.bloxcity.com/account/trades/";
	info.time = 2000;

	if ($('.dropdown-button1', data).length > 0) {
		user.name = $('.dropdown-button1[style="font-size:16px;"]', data).text().split("arrow_drop_down").join("").trim();
		user.id = $('a:contains("Profile")', data).attr('href').split("https://www.bloxcity.com/users/").join("").split("/" + user.name + "/").join("");
		user.on = true;

		init();
	} else {
		chrome.notifications.create('login', {
			type: 'basic',
			title: 'Error',
			message: 'Not logged in',
			iconUrl: 'https://storage.googleapis.com/bloxcity-file-storage/assets/images/BCLogo-Square.png',
			buttons: [{
				title: 'Login'
			}]
		});

		setTimeout(function() { init() }, 5000);
	}
});

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

chrome.browserAction.onClicked.addListener(function(openSettings) {
    chrome.tabs.create({
        url: "https://www.bloxcity.com/bloxplus/"
    })
});

chrome.notifications.onButtonClicked.addListener(function(button, buttonIndex) {
	if (button == "new") {
		chrome.tabs.create({
			url: scan.url
		});
	}

	if (button == "login") {
		chrome.tabs.create({
			url: 'https://www.bloxcity.com/login/'
		})
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
		}
		localStorage.setItem('joined', 'true');
	}

	if (button == "discord") {
		if (buttonIndex == 0) {
			chrome.tabs.create({
				url: 'https://discord.gg/nuM2RBa'
			})
		}
		localStorage.setItem('discord', 'true');
	}

	if (button == "tutorial") {
		if (buttonIndex == 0) {
			chrome.tabs.create({
				url: 'https://gyazo.com/74949f227103273d05c0631527a3e77c'
			});
		}
		localStorage.setItem('tutorial', 'true');
	}
	
	if (button=="message1"){
		if(buttonIndex==0){
			chrome.notifications.clear('message');
			tabId=null
			chrome.tabs.create({
				url: mes.link+'reply'
			})
		}else
		chrome.notifications.clear('message');
		$.get(mes.link).success(function(data) {
		})
	}
		
	if (button=="message2"){
		if(buttonIndex==0){
			chrome.notifications.clear('message2');
			chrome.tabs.create({
				url: mes.link
			})
		}else
			chrome.notifications.clear('message2');
		$.get(mes.link).success(function(data) {
		})
	}
		
	if (button=="trade"){
		chrome.notifications.clear('trade');
        chrome.tabs.create({
            url: trade.link
        })
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
				user.name = $('.dropdown-button1[style="font-size:16px;"]', data).text().split("arrow_drop_down").join("").trim();
				user.id = $('a:contains("Profile")', data).attr('href').split("https://www.bloxcity.com/users/").join("").split("/" + user.name + "/").join("");
			} else {
				user.on = false;
			}
		});
	}, 5000);

	// Getting the latest t-shirt ID
	$.get(links.tshirts).success(function(data) {
		recent.id = parseInt($('.col', data).first().find('a').first().attr('href').split("https://www.bloxcity.com/market/").join("").split("/").join(""));
		$.get(links.recent).success(function(data){
			recent.scanned = $('.col', data).first().find('a').first().attr('href').split("https://www.bloxcity.com/market/").join("").split("/").join("");

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
						if (info.type != "") {
							if(scan.id != recent.scanned) {
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
								recent.scanned = scan.id;
								if(recent.id < parseInt(scan.id)) {
									recent.id = parseInt(scan.id);
								}
							}
						}
					}
				});

			}, info.time);
		});
	});
	
	//Message Notifier
	//Getting lastest message when starting
	$.get(links.messages).success(function(data) {
		mes.full = $('form[method="post"] a', data).first();
		mes.link = mes.full.attr('href');
		mes.latestMessage = mes.link;
		
		
		var messageNotifier = setInterval(function(){
			if(JSON.parse(localStorage.getItem('opt_message_notifier')) && !JSON.parse(localStorage.getItem('opt_disable_notifications')) && user.on) {
				$.get(links.messages).success(function(data) {
					mes.full = $('form[method="post"] a', data).first();
					mes.html = mes.full.find('table tbody tr td:last-child', data);
					mes.sender = mes.html.find('[href*="https://www.bloxcity.com/users/"]').first().text();
					mes.title = mes.html.find('div', data)[3].innerText;
					mes.text = mes.html.find('div', data)[5].innerText;
					mes.senderImg = mes.full.find('table tbody tr td:nth-child(2) img', data).attr('src');
					mes.link = mes.full.attr('href');
					if(mes.text.endsWith("...")!=true && mes.text.length < 35 && mes.title.length < 35){
						mes.type = '1';
						mes.button1 = 'Reply';
					} else {
						mes.type = '2';
						mes.button1 = 'Read Full Message';
					}
					if(mes.sender!="BLOX City"){
						if(mes.latestMessage!=mes.link){
							chrome.notifications.create('message'+mes.type, {
								type: 'list',
								title: 'New Message from ' + mes.sender,
								iconUrl: mes.senderImg,
								message: '',
								items: [{
									title: mes.title,
									message: ''
								}, {
									title: '',
									message: mes.text,
								}],
								buttons: [{
									title: mes.button1
								}, {
									title: 'Mark as Read'
								}]
							})
							message.play();
							mes.latestMessage = mes.link;
						}
					}
				})
			}
		}, 30000)
	})
	
	//Trade Notifier
	//Getting the latest trade
	$.get(links.trades).success(function(data) {
		trade.full = $('#Incoming a', data).first();
		trade.link = trade.full.attr('href');
		trade.latestTrade = trade.link;
	})
	
	var tradeNotifier = setInterval(function() {
		if(JSON.parse(localStorage.getItem('opt_trade_notifier')) && !JSON.parse(localStorage.getItem('opt_disable_notifications')) && user.on) {
			$.get(links.trades).success(function(data) {
				trade.full = $('#Incoming a', data).first();
				trade.link = trade.full.attr('href')
				trade.title = trade.full.find('div[style="font-size:18px;color:#333;"]', data)[0].innerText
				trade.img = trade.full.find('img',data).attr('src')
				if(trade.latestTrade!=trade.link){
				chrome.notifications.create('trade', {
						type: 'basic',
						title: trade.title,
						iconUrl: trade.img,
						message: '',
						buttons: [{
							title: 'View Trade'
						}]
					})
					trade.latestTrade = trade.link;
					tradeau.play();
				}
			})
		}
	}, 30000)
}