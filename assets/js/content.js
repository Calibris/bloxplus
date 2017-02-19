var report = new Object();
var sobj = new Object();
var cobj = new Object();

var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "https://www.bloxcity.com/forum/create/9/", false);
xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlHttp.send(null);
var csrf_token = $('[name="csrf_token"]', xmlHttp.responseText).val();

for (key in settings) {
	if (!localStorage.getItem(settings[key].id)) {
		localStorage.setItem(settings[key].id, settings[key].enabled);
		cobj[settings[key].id] = settings[key].enabled;

		chrome.runtime.sendMessage(cobj, function() {
  			console.log('Default settings saved.');
		});
	}
}

$('#more-links').append('<li class="divider"></li>');
$('#more-links').append('<li><a href="https://www.bloxcity.com/bloxplus" style="font-size:16px;">Bloxplus</a></li>');

if (window.location.href.indexOf("https://www.bloxcity.com/bloxplus/") > -1) {
	$('head').append('<link rel="stylesheet" href="https://www.bloxcity.com/assets/css/default.css">');
	$('body script').remove();
	$('.entire-page-wrapper').replaceWith('<div class="entire-page-wrapper"> <div style="padding-top:100px;"></div><div class="row" style="margin-bottom:0;width:46%;margin:0 auto;"> <div class="col s12"> <ul class="tabs"> <li class="tab col s4"><a class="active" href="#settings">Settings</a></li> <li class="tab col s4"><a href="#support">Support</a></li> <li class="tab col s4"><a href="#information">Information</a></li> </ul> </div> <div id="settings" class="col s12"> <div style="height: 25px"></div> <div class="header-text" style="font-size:18px;padding-bottom:5px;">General</div> <div class="content-box" id="settings-1"> <div class="first"></div> <div class="second"></div> </div> <div style="height:25px;"></div> <div class="header-text" style="font-size:18px;padding-bottom:5px;">Notifications &amp; Sounds</div> <div class="content-box" id="settings-2"> <div class="first"></div> <div class="second"></div> </div> <div style="height:25px;"></div><font style="float:left;"><a href="https://www.bloxcity.com/">Return to BLOXCity.com</a></font> <input type="button" class="groups-blue-button" style="padding:0;padding:4px 8px;float:right;" value="Save Settings" id="save-settings"></div> <div id="support" class="col s12" style="display: block;"> <div style="height: 25px"></div> <div class="header-text" style="font-size:18px;padding-bottom:5px;">Issues</div><textarea id="issue" class="general-textarea" placeholder="Write your bloxplus issues here..." style="height: 125px !important;margin-left: 0px;margin-right: 0px;width: 100%;resize: none;" length="1000"></textarea> <input type="button" id="issue-button" class="groups-blue-button" style="padding:0;padding:4px 8px;float:right;" value="Send"><div style="height: 25px"></div><div class="header-text" style="font-size:18px;padding-bottom:5px;">Suggestions</div><textarea id="suggestion" class="general-textarea" placeholder="Write your bloxplus suggestions here..." style="height: 125px !important;margin-left: 0px;margin-right: 0px;width: 100%;resize: none;" length="1000"></textarea><input type="button" id="suggestion-button" class="groups-blue-button" style="padding:0;padding:4px 8px;float:right;" value="Send"><div style="height: 25px"></div> <div class="header-text" style="font-size:18px;padding-bottom:5px;">Questions</div><textarea id="question" class="general-textarea" placeholder="Write your bloxplus questions here..." style="height: 125px !important;margin-left: 0px;margin-right: 0px;width: 100%;resize: none;" length="1000"></textarea> <input type="button" id="question-button" class="groups-blue-button" style="padding:0;padding:4px 8px;float:right;" value="Send"><div style="height: 25px"></div><div style="height: 25px"></div><div class="header-text" style="font-size:18px;padding-bottom:5px;">FAQ</div><div class="content-box" id="faq-box"> <div class="first"><ul></ul></div> <div class="second"><ul></ul></div> </div><div style="height: 25px"></div><font style="float:left;"><a href="https://www.bloxcity.com/">Return to BLOXCity.com</a></font> </div> <div id="information" class="col s12"><div style="height: 25px"></div> <div class="header-text" style="font-size:18px;padding-bottom:5px;">Features</div> <div class="content-box" id="features-box"> <div class="first"><ul></ul></div> <div class="second"><ul></ul></div></div> <div style="height: 25px"></div> <font style="float:left;"><a href="https://www.bloxcity.com/">Return to BLOXCity.com</a></font> </div> </div> </div>');
	$('ul.tabs').tabs();
	$(document).ready(function() { $('.character-counter').remove(); });

	$('#issue-button').click(function() {
		report.issue($('#issue').val());
		$(this).prop('disabled', true);
	});

	$('#suggestion-button').click(function() {
		report.suggest($('#suggestion').val());
		$(this).prop('disabled', true);
	});

	$('#question-button').click(function() {
		report.question($('#question').val());
		$(this).prop('disabled', true);
	});

	for (key in faq) {
		if ((key - 1) % 2) {
			$('#faq-box .first ul').append('<li style="padding-bottom: 10px; height: 120px;"><b>' + faq[key].title + '</b> ' + faq[key].body + '</li>');
		} else {
			$('#faq-box .second ul').append('<li style="padding-bottom: 10px; height: 120px;"><b>' + faq[key].title + '</b> ' + faq[key].body + '</li>');
		}
	}

	for (key in features) {
		if (key % 2) {
			$('#features-box .first ul').append('<li style="padding-bottom: 10px; height: 120px;"><b>' + features[key].title + ':</b> ' + features[key].body + '</li>');
		} else {
			$('#features-box .second ul').append('<li style="padding-bottom: 10px; height: 120px;"><b>' + features[key].title + ':</b> ' + features[key].body + '</li>');
		}
	}

	for (key in settings) {
		if (settings[key].parent == 1) {
			if ((key - 1) % 2) {
				$('#settings-1 .first').append('<p> <i class="material-icons right tooltipped" data-position="bottom" data-delay="50" data-tooltip="' + settings[key].tip + '" style="cursor: pointer;color:#9e9e9e;font-size:15px;margin-right:16px;">info</i> <input type="checkbox" id="' + settings[key].id + '" /> <label for="' + settings[key].id +'">' + settings[key].name +'</label> </p>');
			} else {
				$('#settings-1 .second').append('<p> <i class="material-icons right tooltipped" data-position="bottom" data-delay="50" data-tooltip="' + settings[key].tip + '" style="cursor: pointer;color:#9e9e9e;font-size:15px;margin-right:16px;">info</i> <input type="checkbox" id="' + settings[key].id + '" /> <label for="' + settings[key].id +'">' + settings[key].name +'</label> </p>');
			}
		}

		if (settings[key].parent == 2) {
			if ((key - 1) % 2) {
				$('#settings-2 .first').append('<p> <i class="material-icons right tooltipped" data-position="bottom" data-delay="50" data-tooltip="' + settings[key].tip + '" style="cursor: pointer;color:#9e9e9e;font-size:15px;margin-right:16px;">info</i> <input type="checkbox" id="' + settings[key].id + '" /> <label for="' + settings[key].id +'">' + settings[key].name +'</label> </p>');
			} else {
				$('#settings-2 .second').append('<p> <i class="material-icons right tooltipped" data-position="bottom" data-delay="50" data-tooltip="' + settings[key].tip + '" style="cursor: pointer;color:#9e9e9e;font-size:15px;margin-right:16px;">info</i> <input type="checkbox" id="' + settings[key].id + '" /> <label for="' + settings[key].id +'">' + settings[key].name +'</label> </p>');
			}
		}

		$('#' + settings[key].id).prop('checked', JSON.parse(localStorage.getItem(settings[key].id)));
	}

	$('#save-settings').click(function() {
		updateSettings();
	});
	$('.tooltipped').tooltip();
};

if (window.location.href.indexOf('https://www.bloxcity.com/account/ViewTrade.php') > -1 && JSON.parse(localStorage.getItem('opt_trade_assistance'))) {
	var give = $('legend:contains("Give")').parent().parent().find('[style="font-size:12px;"]');
	var receive = $('legend:contains("Receive")').parent().parent().find('[style="font-size:12px;"]');
	var elm = $('h5:contains("trade with ")').text().split("trade with ");
	elm[0] = "";
	var trader = elm.join("");
   	$('.bc-content').prepend('<input type="submit" id="postMarket" value="Post to marketplace" class="groups-blue-button" style="padding:0;padding:4px 8px;float: right">');
	$('#postMarket').click(function() {
   		postTrade();
   	});
}

if (window.location.href.indexOf("https://www.bloxcity.com/users/") > -1 && $('.header-text:contains("Achievements")').length > 0) {
	var url = window.location.href;
	var id = url.split('https://www.bloxcity.com/users/').join("").split("/"+ $('[style="padding-top:5px;font-size:18px;float:left;"]').text() +"/").join("");
	var base = 0;
    var length = 0;

    if (JSON.parse(localStorage.getItem('opt_user_value'))) {
    	$('[style="padding:15px;font-size:14px;margin-top:15px;"] tbody').append('<tr> <td style="font-weight:bold;text-align:right;width:45%;">User Value:</td> <td style="font-weight:normal;text-align:center;width:55%;" id="userValue">0</td> </tr>');
	}

	if (JSON.parse(localStorage.getItem('opt_collectible_counter'))) {
		if (JSON.parse(localStorage.getItem('opt_user_value'))) {
			$('[style="padding:15px;font-size:14px;margin-top:15px;"] tbody').append('<tr> <td style="font-weight:bold;text-align:right;width:45%;padding-bottom:0 !important;">Collectibles:</td> <td style="font-weight:normal;text-align:center;width:55%;padding-bottom:0 !important;" id="collectibles">None</td> </tr>');
		} else {
			$('[style="padding:15px;font-size:14px;margin-top:15px;"] tbody').append('<tr> <td style="font-weight:bold;text-align:right;width:45%;">Collectibles:</td> <td style="font-weight:normal;text-align:center;width:55%" id="collectibles">None</td> </tr>');
		}
	}

	if (JSON.parse(localStorage.getItem('opt_user_value')) || JSON.parse(localStorage.getItem('opt_collectible_counter'))) {
		$('td:contains("Forum Posts:")').parent().children().css('padding-bottom', '10px');
	}

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "https://www.bloxcity.com/API/GetItems.php?UserID=" + id, false);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.send("");
	var response = JSON.parse(xmlHttp.response);

    if (response.length > 0) {
        for (i in response) {
            base += parseInt(response[i].ev.split(",").join(""));
        }
        base = base.toLocaleString();
        length = response.length;

        $('#userValue').text(base);
        $('#collectibles').text(length);
    }
}

if (window.location.href.indexOf('https://www.bloxcity.com/users/search/') > -1) {
	var totalusers = $('td:contains("Total Users")').text().trim();

	if (window.location == "https://www.bloxcity.com/users/search/#error") {
		if (JSON.parse(localStorage.getItem('opt_id_surfing'))) {
			$('.content-box').first().replaceWith('<div class="content-box" style="background: none; border-radius: 0px; border: none; padding: 0px"> <div class="card-panel red" style="color:white;"> The user you requested is non-existent. </div> <div class="row"> <div class="col s12 m2 l2"> <select class="browser-default market-dropdown" name="type"> <option value="0">Username</option> <option value="1">ID</option> </select> </div> <div class="col s12 m10 l10"> <input type="text" class="general-textbar" placeholder="' + totalusers + '" id="query"> </div> </div> </div>');
		} else {

			$('.content-box').first().replaceWith('<div class="content-box" style="background: none; border-radius: 0px; border: none; padding: 0px"> <div class="card-panel red" style="color:white;"> The user you requested is non-existent. </div> <div class="row"> <div class="col s12 m10 l12"> <input type="text" class="general-textbar" placeholder="' + totalusers + '" id="query"> </div> </div> </div>');
		}
	} else {
		if (JSON.parse(localStorage.getItem('opt_id_surfing'))) {
			$('.content-box').first().replaceWith('<div class="content-box" style="background: none; border-radius: 0px; border: none; padding: 0px"> <div class="row"> <div class="col s12 m2 l2"> <select class="browser-default market-dropdown" name="type"> <option value="0">Username</option> <option value="1">ID</option> </select> </div> <div class="col s12 m10 l10"> <input type="text" class="general-textbar" placeholder="' + totalusers + '" id="query"> </div> </div> </div>');
		} else {
			$('.content-box').first().replaceWith('<div class="content-box" style="background: none; border-radius: 0px; border: none; padding: 0px"> <div class="row"> <div class="col s12 m10 l12"> <input type="text" class="general-textbar" placeholder="' + totalusers + '" id="query"> </div> </div> </div>');
		}
	}

	$(document).keypress(function(e) {
		if (e.which == 13 && $('#query').is(':focus') && $('#query').val().length > 0) {
			userSearch($('#query').val());
		}
	})
}

if (window.location.href.indexOf('https://www.bloxcity.com/forum/thread/') > -1) {
	var posts = $('strong:contains("Posts")').parent().next();
	if (JSON.parse(localStorage.getItem('opt_format'))) {
		for (var i = 0; i < posts.length; i++) {
		   var current = parseInt(posts.eq(i).text().split(",").join(""));
		   if (current < 1000) {
		      posts.eq(i).text(current.toString());
		   } else {
		      var a = Math.round(current / 100) / 10;
		      var result = a.valueOf() + 'K';
		      posts.eq(i).text(result.toString());
		   }
		}
	}
}

if(window.location.href.endsWith("/reply/")==true){
	var reply = document.getElementsByClassName("edit-hover")[0]
	reply.click()
}

function postTrade() {
	var giving = [];
	var receiving = [];
	var postGiving = "";
	var postReceiving = "";

	for (var i = 0; i < give.length; i++) {
		giving.push(give.eq(i).text());
		if (i == (give.length - 1)) {
			postGiving += " " + giving[i];
		} else {
			postGiving += " " + giving[i] + ",";
		}
	}

	for (var x = 0; x < receive.length; x++) {
		receiving.push(receive.eq(x).text())
		if (x == (receive.length - 1)) {
			postReceiving += " " + receiving[x];
		} else {
			postReceiving += " " + receiving[x] + ",";
		}
	}

	var postTitle = "Win or lose? (A/D)";
	var postMessage = "What I'm giving:" + postGiving + "\n" + "What I'm receiving:" + postReceiving;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "https://www.bloxcity.com/forum/create/9/", false);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.send("title=" + postTitle + "&post=" + postMessage + "&csrf_token=" + csrf_token + "&submit=CREATE POST");
	var response = xmlHttp.responseText;
	if (xmlHttp.readyState == 4) {
		chrome.runtime.sendMessage({'notifyTrade': true}, function() {});
	} else {
		alert('Error');
	}
}

function userSearch(value) {
	if (JSON.parse(localStorage.getItem('opt_id_surfing'))) {
		var type = $('[name="type"]').val();
	} else {
		var type = 0;
	}
	getUser(type, value);
}

function getUser(type, value) {
	if (type == 0) {
	    window.location = "https://www.bloxcity.com/users/search/?search=" + value;
	}

	if (type == 1) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", "https://www.bloxcity.com/users/" + value +"/Buttowski/message/", true);
		xmlHttp.send(null);

		xmlHttp.onload = function(data) {
	   		if (xmlHttp.readyState == 4) {
	      		var response = xmlHttp.responseText;
	      		var header = $('.header-text', response).first().text();

	      		if ($('[style="padding-top:5px;font-size:18px;float:left;"]', response).length > 0) {
	      			var name = $('[style="padding-top:5px;font-size:18px;float:left;"]', response).text().split("info_outline").join("");
	      			window.location = "https://www.bloxcity.com/users/search/?search=" + name;
	      		} else if ($('[style="font-size:18px;padding-bottom:5px;"]', response).length > 0) {
	      			var name = $('[style="font-size:18px;padding-bottom:5px;"]', response).text().split("Send a message to ").join("");
	      			window.location = "https://www.bloxcity.com/users/search/?search=" + name;
	      		} else {
	      			window.location = "https://www.bloxcity.com/users/search/#error";
	      			location.reload();
	      		}
	   		}
		}
	}
}

function updateSettings() {
	var bobj = {};

	for (key in settings) {
		localStorage.setItem(settings[key].id, $('#' + settings[key].id).prop('checked'));
		bobj[settings[key].id] = localStorage.getItem(settings[key].id);
	}

	chrome.runtime.sendMessage(bobj, function() {
  		Materialize.toast('Settings saved', 5000);
	});
}

report.issue = function(message) {
	var title = "Bloxplus Issue";

	if (message.length > 3) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("POST", "https://www.bloxcity.com/users/98214/Calibris/message/", false);
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlHttp.send("title=" + title + "&message=" + message + "&submit=Submit Mesage");
		var response = xmlHttp.responseText;

		if ($('.header-text', response).length != 1) {
    		Materialize.toast('The report was successfully sent.', 5000);

    		setTimeout(function() {
				$('#issue-button').prop('disabled', false);
			}, 5000);
		} else {
    		Materialize.toast('Please wait before sending another suggestion.', 5000);
		}
	} else {
		Materialize.toast('Report must be longer than 3 letters.', 5000);
	}
};

report.suggest = function(message) {
	var title = "Bloxplus Suggestion";

	if (message.length > 3) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("POST", "https://www.bloxcity.com/users/98214/Calibris/message/", false);
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlHttp.send("title=" + title + "&message=" + message + "&submit=Submit Mesage");
		var response = xmlHttp.responseText;

		if ($('.header-text', response).length != 1) {
    		Materialize.toast('The report was successfully sent.', 5000);

    		setTimeout(function() {
				$('#suggestion-button').prop('disabled', false);
			}, 5000);
		} else {
    		Materialize.toast('Please wait before sending another suggestion.', 5000);
		}
	} else {
		Materialize.toast('Report must be longer than 3 letters.', 5000);
	}
};

report.question = function(message) {
	var title = "Bloxplus question";

	if (message.length > 3) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("POST", "https://www.bloxcity.com/users/98214/Calibris/message/", false);
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlHttp.send("title=" + title + "&message=" + message + "&submit=Submit Mesage");
		var response = xmlHttp.responseText;

		if ($('.header-text', response).length != 1) {
    		Materialize.toast('The question was successfully sent.', 5000);

			setTimeout(function() {
				$('#question-button').prop('disabled', false);
			}, 5000);
		} else {
    		Materialize.toast('Please wait before sending another question.', 5000);
		}
	} else {
		Materialize.toast('Question must be longer than 3 letters.', 5000);
	}
}