$(document).ready(function() {
	if ($('.header-text:contains("Achievements")').length > 0) {
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

		$.get('https://www.bloxcity.com/API/GetItems.php?UserID=' + id).success(function(data) {
			if (data.length > 0) {
				for (i in data) {
		            base += parseInt(data[i].ev.split(",").join(""));
		        }
		        base = base.toLocaleString();
		        length = data.length;

		        $('#userValue').text(base);
		        $('#collectibles').text(length);
				}
		});
	}
});