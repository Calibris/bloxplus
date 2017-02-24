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
});

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