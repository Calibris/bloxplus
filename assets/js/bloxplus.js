$('head').append('<link rel="stylesheet" href="https://www.bloxcity.com/assets/css/default.css">');
$('body script').remove();
$('.entire-page-wrapper').replaceWith('<div class="entire-page-wrapper"> <div style="padding-top:100px;"></div><div class="row" style="margin-bottom:0;width:46%;margin:0 auto;"> <div class="col s12"> <ul class="tabs"> <li class="tab col s4"><a class="active" href="#settings">Settings</a></li> <li class="tab col s4"><a href="#support">Support</a></li> <li class="tab col s4"><a href="#information">Information</a></li> </ul> </div> <div id="settings" class="col s12"> <div style="height: 25px"></div> <div class="header-text" style="font-size:18px;padding-bottom:5px;">General</div> <div class="content-box" id="settings-1"> <div class="first"></div> <div class="second"></div> </div> <div style="height:25px;"></div> <div class="header-text" style="font-size:18px;padding-bottom:5px;">Notifications &amp; Sounds</div> <div class="content-box" id="settings-2"> <div class="first"></div> <div class="second"></div> </div> <div style="height:25px;"></div><font style="float:left;"><a href="https://www.bloxcity.com/">Return to BLOXCity.com</a></font> <input type="button" class="groups-blue-button" style="padding:0;padding:4px 8px;float:right;" value="Save Settings" id="save-settings"></div> <div id="support" class="col s12" style="display: block;"> <div style="height: 25px"></div> <div class="header-text" style="font-size:18px;padding-bottom:5px;">Issues</div><textarea id="issue" class="general-textarea" placeholder="Write your bloxplus issues here..." style="height: 125px !important;margin-left: 0px;margin-right: 0px;width: 100%;resize: none;" length="1000"></textarea> <input type="button" id="issue-button" class="groups-blue-button" style="padding:0;padding:4px 8px;float:right;" value="Send"><div style="height: 25px"></div><div class="header-text" style="font-size:18px;padding-bottom:5px;">Suggestions</div><textarea id="suggestion" class="general-textarea" placeholder="Write your bloxplus suggestions here..." style="height: 125px !important;margin-left: 0px;margin-right: 0px;width: 100%;resize: none;" length="1000"></textarea><input type="button" id="suggestion-button" class="groups-blue-button" style="padding:0;padding:4px 8px;float:right;" value="Send"><div style="height: 25px"></div> <div class="header-text" style="font-size:18px;padding-bottom:5px;">Questions</div><textarea id="question" class="general-textarea" placeholder="Write your bloxplus questions here..." style="height: 125px !important;margin-left: 0px;margin-right: 0px;width: 100%;resize: none;" length="1000"></textarea> <input type="button" id="question-button" class="groups-blue-button" style="padding:0;padding:4px 8px;float:right;" value="Send"><div style="height: 25px"></div><div style="height: 25px"></div><div class="header-text" style="font-size:18px;padding-bottom:5px;">FAQ</div><div class="content-box" id="faq-box"> <div class="first"><ul></ul></div> <div class="second"><ul></ul></div> </div><div style="height: 25px"></div><font style="float:left;"><a href="https://www.bloxcity.com/">Return to BLOXCity.com</a></font> </div> <div id="information" class="col s12"><div style="height: 25px"></div> <div class="header-text" style="font-size:18px;padding-bottom:5px;">Features</div> <div class="content-box" id="features-box"> <div class="first"><ul></ul></div> <div class="second"><ul></ul></div></div> <div style="height: 25px"></div> <font style="float:left;"><a href="https://www.bloxcity.com/">Return to BLOXCity.com</a></font> </div> </div> </div>');
$('ul.tabs').tabs();
$(document).ready(function() {
    $('.character-counter').remove();
});

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
            $('#settings-1 .first').append('<p> <i class="material-icons right tooltipped" data-position="bottom" data-delay="50" data-tooltip="' + settings[key].tip + '" style="cursor: pointer;color:#9e9e9e;font-size:15px;margin-right:16px;">info</i> <input type="checkbox" id="' + settings[key].id + '" /> <label for="' + settings[key].id + '">' + settings[key].name + '</label> </p>');
        } else {
            $('#settings-1 .second').append('<p> <i class="material-icons right tooltipped" data-position="bottom" data-delay="50" data-tooltip="' + settings[key].tip + '" style="cursor: pointer;color:#9e9e9e;font-size:15px;margin-right:16px;">info</i> <input type="checkbox" id="' + settings[key].id + '" /> <label for="' + settings[key].id + '">' + settings[key].name + '</label> </p>');
        }
    }

    if (settings[key].parent == 2) {
        if ((key - 1) % 2) {
            $('#settings-2 .first').append('<p> <i class="material-icons right tooltipped" data-position="bottom" data-delay="50" data-tooltip="' + settings[key].tip + '" style="cursor: pointer;color:#9e9e9e;font-size:15px;margin-right:16px;">info</i> <input type="checkbox" id="' + settings[key].id + '" /> <label for="' + settings[key].id + '">' + settings[key].name + '</label> </p>');
        } else {
            $('#settings-2 .second').append('<p> <i class="material-icons right tooltipped" data-position="bottom" data-delay="50" data-tooltip="' + settings[key].tip + '" style="cursor: pointer;color:#9e9e9e;font-size:15px;margin-right:16px;">info</i> <input type="checkbox" id="' + settings[key].id + '" /> <label for="' + settings[key].id + '">' + settings[key].name + '</label> </p>');
        }
    }

    $('#' + settings[key].id).prop('checked', JSON.parse(localStorage.getItem(settings[key].id)));
}

$('#save-settings').click(function() {
    updateSettings();
});
$('.tooltipped').tooltip();

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