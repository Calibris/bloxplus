var faq = [{
	title: "Is bloxplus legit?",
	body: "Bloxplus is legit, but we're not an official BLOX City extension and we are not affiliated with BLOX City or their staff. Bloxplus is a safe and friendly user made extension."
}, {
	title: "Who are the developers of bloxplus?",
	body: "Jefemy and Peridax are the developers for bloxplus, and Toby is the voice actor for bloxplus."
}, {
	title: "Is bloxplus open source?",
	body: "Yes, bloxplus is open source on Github and can be found on github <a href='https://github.com/calibris/bloxplus' target='_blank'>here</a>."
}, {
	title: "What is Calibris?",
	body: "Calibris is a development group which own bloxplus as a project, although not all members are developers."
}]

var features = [,{
	title: "Notifiers",
	body: "Bloxplus provides several notifiers, including: new collectible notifier, updated item notifier, new regular item notifier, new trade notifier, and new message notifier"
}, {
	title: "User Value",
	body: "Displays the estimated value of a user on their profile page, calculated by adding all of the estimated values of the user's collectibles."
}, { 
	title: "Collectible Counter",
	body: "Displays the amount of collectibles a user currently has on their profile page."
}, {
	title: "Trade assistance",
	body: "When viewing a trade a button will appear which if clicked will post all trade details to the marketplace requesting users to give their opinions whether you should accept or decline the trade."
}, {
	title: "Post Count Formatter",
	body: "When viewing a thread, users with over 999 posts will have their post count rounded to a K format. (Example: 1,250 => 1.3K)"
}, {
	title: "ID Surfing",
	body: "When you're at the user search page you're able to search users by both username and ID."
}, {
	title: "Night Mode",
	body: "The site's theme is changed to a darker theme, grayscaling most elements and removing most strong colors."
}];

var settings = [{
	name: "Disable Notifications",
	id: "opt_disable_notifications",
	tip: "Disables all notifiers",
	parent: 2,
	enabled: false
}, {
	name: "Mute Notifications",
	id:  "opt_mute",
	tip: "Mutes all notification sounds",
	parent: 2,
	enabled: false
}, {
	name: "Collectible Notifier",
	id: "opt_collectible_notifier",
	tip: "Notifies you when a new collectible is released",
	parent: 2,
	enabled: true
}, {
	name: "Item Notifier",
	id: "opt_item_notifier",
	tip: "Notifies you when a new item is released",
	parent: 2,
	enabled: true
}, {
	name: "Updated Item Notifier",
	id: "opt_updated_notifier",
	tip: "Notifies you when a collectible/item is updated",
	parent: 2,
	enabled: true
}, {
	name: "Trade Assistance",
	id: "opt_trade_assistance",
	tip: "When viewing a trade you're able to post trade <br> details to the marketplace sub-forum",
	parent: 1,
	enabled: true
}, {
	name: "Post Count Formatter",
	id: "opt_format",
	tip: "Post counts over 999 will convert to a K format (1K...)",
	parent: 1,
	enabled: false
}, {
	name: "Collectible Counter",
	id: "opt_collectible_counter",
	tip: "Displays the amount of collectibles of a user when you're viewing their profile page",
	parent: 1,
	enabled: true
}, {
	name: "User Value",
	id: "opt_user_value",
	tip: "Displays a user's estimated value when viewing their profile page",
	parent: 1,
	enabled: true
}, {
	name: "Night Mode",
	id: "opt_night_mode",
	tip: "Converts site theme for a better night surfing experience",
	parent: 1,
	enabled: false
}, {
	name: "ID Surfing",
	id: "opt_id_surfing",
	tip: "Allows your to search users by IDs at the user search page",
	parent: 1,
	enabled: true
}];