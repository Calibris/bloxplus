window.onload = function() {
	if (!localStorage.getItem($('.dropdown-button1[style="font-size:16px;"]').text().split("arrow_drop_down").join("").trim() + '-outfits')) {
	    localStorage.setItem($('.dropdown-button1[style="font-size:16px;"]').text().split("arrow_drop_down").join("").trim() + '-outfits', "[]");
	}

	var outfits = JSON.parse(localStorage.getItem($('.dropdown-button1[style="font-size:16px;"]').text().split("arrow_drop_down").join("").trim() + '-outfits'));

	$('.l4').append('<div style="height: 25px"></div>');
  $('.l4').append('<div class="header-text" style="font-size:18px;padding-bottom:5px;">Create Outfit</div>');
	$('.l4').append('<div class="content-box" style="text-align: right"> <table width="100%"> <tbody><tr> <td width="35%" style="text-align:right;">Name</td> <td style="padding-left:20px !important;"> <input type="text" id="outfit-name" class="general-textarea" style="width:200px;" placeholder="Outfit Name"> </td> </tr> </tbody></table> <a href="#" id="create-outfit">Create Outfit</a> </div> <div style="color:#777;font-size:14px;">Please note that outfits are a new feature and can have many bugs. It can take up to a minute for the outfit to load.  If it does not load or it logs you out it shouldn' + "'" + 't happen if you try again. Please go to BloxPlus settings and go to support if you have any bugs or questions.</div>');
	$('[style="text-align:center;color:#999;font-size:14px;"]').append(' | <a id="outfits" style="cursor: pointer; font-weight: normal;" id="pants-link">Outfits</a>');

	$('#outfits').click(function() {
	    loadOutfits();
	});

	$('#create-outfit').click(function() {
	    createOutfit($('#outfit-name').val(), $('#avatar').attr('src'));
	});

	$('[style="text-align:center;color:#999;font-size:14px;"] a').click(function() {
	    for (var x = 0; x < $('[style="text-align:center;color:#999;font-size:14px;"] a').length; x++) {
	        $('[style="text-align:center;color:#999;font-size:14px;"] a').eq(x).css('font-weight', 'normal');
	    };

	    $(this).css('font-weight', 'bold');
	});

	function loadOutfits() {
	    var storage = '<div class="row" style="margin-bottom:0;">';

	    for (var i = 0; i <= 8; i++) {
	        if (i == 4 && outfits[4]) {
	            storage += '<div class="clearfix"></div>';
              storage += '<div class="col s3 center-align" style="padding:15px;"> <div style="position:relative;"> <img src="' + outfits[i].img + '" style="display:block;margin:0 auto;width:108.047px;height:108.047px;"> <a href="#"><div style="padding-top:10px;font-size:12px;">' + outfits[i].name + '</div></a> <div style="position:absolute;top:0;right:0;"><a class="dropdown-button" data-beloworigin="true" href="#" data-activates="' + outfits[i].name + '"><i class="material-icons" style="font-size:18px;color:#777777;">settings</i></a><ul id="' + outfits[i].name + '" class="dropdown-content"> <li><a href="#" class="wear-outfit" data="' + outfits[i].name + '">Wear</a></li> <li><a href="#" class="remove-outfit" data="' + outfits[i].name + '">Remove</a></li> </ul></div> </div> </div>'
	        } else if (i == 8) {
	            storage += '</div>'
	        } else if (outfits[i]) {
	            storage += '<div class="col s3 center-align" style="padding:15px;"> <div style="position:relative;"> <img src="' + outfits[i].img + '" style="display:block;margin:0 auto;width:108.047px;height:108.047px;"> <a href="#"><div style="padding-top:10px;font-size:12px;">' + outfits[i].name + '</div></a> <div style="position:absolute;top:0;right:0;"><a class="dropdown-button" data-beloworigin="true" href="#" data-activates="' + outfits[i].name + '"><i class="material-icons" style="font-size:18px;color:#777777;">settings</i></a><ul id="' + outfits[i].name + '" class="dropdown-content"> <li><a href="#" class="wear-outfit" data="' + outfits[i].name + '">Wear</a></li> <li><a href="#" class="remove-outfit" data="' + outfits[i].name + '">Remove</a></li> </ul></div> </div> </div>'
	        }

	        $('#inventory-box').html(storage);
	    }

	    $('.dropdown-button').dropdown();

	    $('.wear-outfit').click(function() {
		    for (i in outfits) {
		        if ($(this).attr('data') == outfits[i].name) {
		            wearOutfit(outfits[i].items, outfits[i].parts);
		        }
		    }
		    console.log('click')
		});

		$('.remove-outfit').click(function() {
		    for (i in outfits) {
		        if ($(this).attr('data') == outfits[i].name) {
		            removeOutfit(outfits[i].name);
		        }
		    }
		    console.log('click')
		})

	}

	function createOutfit(name, avatar) {
	    var items = $('.remove');
	    var a = $('[onclick*="showP"]');
	    var approved = true;
	    var kk = "";
	    var str = "";
	    var obj = {};
	    var arr = [];
	    var g = [];

	    for (var i = 0; i < items.length; i++) {
	        kk += items.eq(i).attr('onclick');
	    };

	    var str = kk.split("removeItem(").join("").split(")");

	    for (i in str) {
	        if (str[i] >= 1) {
	            arr.push(str[i]);
	        }
	    }

	    for (var i = 0; i < a.length; i++) {
	        var x = a.eq(i).attr('id');
	        var y = a.eq(i).css('background-color');

	        if (x == "head") {
	            g.push({
	                "head": y
	            });
	        } else if (x == "torso") {
	            g.push({
	                "torso": y
	            });
	        } else if (x == "leftarm") {
	            g.push({
	                "leftarm": y
	            });
	        } else if (x == "rightarm") {
	            g.push({
	                "rightarm": y
	            });
	        } else if (x == "leftleg") {
	            g.push({
	                "leftleg": y
	            });
	        } else if (x == "rightleg") {
	            g.push({
	                "rightleg": y
	            });
	        }
	    }

	    obj.name = name;
	    obj.img = avatar;
	    obj.items = arr;
	    obj.parts = g;

	    var outfits = JSON.parse(localStorage.getItem($('.dropdown-button1[style="font-size:16px;"]').text().split("arrow_drop_down").join("").trim() + '-outfits'));

	    if ((outfits.length < 8 || outfits.length == 0) && obj.items) {
	        for (i in outfits) {
	            if (outfits[i].name.toLowerCase() == obj.name.toLowerCase()) {
	                approved = false;
	            }
	        }

	        if (approved) {
	            outfits.push(obj);
	            localStorage.setItem($('.dropdown-button1[style="font-size:16px;"]').text().split("arrow_drop_down").join("").trim() + '-outfits', JSON.stringify(outfits));
	            location.reload();
	        } else {
	            Materialize.toast('That outfit already exists!', 5000);
	        }
	    } else {
	        Materialize.toast('You can only have 8 outfits!', 5000);
	    }
	}

	function removeOutfit(a) {
	    for (i in outfits) {
	        if (a == outfits[i].name) {
	            outfits.splice(i, 1);
	        }
	    }
	    localStorage.setItem($('.dropdown-button1[style="font-size:16px;"]').text().split("arrow_drop_down").join("").trim() + '-outfits', JSON.stringify(outfits));
	    location.reload();
	}

	function wearOutfit(arr, pts) {
    removeItems(arr, pts);

	  var str = "";
		var b=-1
		var c=-1
		var d=-1
	    for (var i=1; i <= pts.length; i++) {
			setTimeout(function(){
			b++;
			c++;
			for (c in pts[b]) {
				changeColor(JSON.stringify(rgb2hex(pts[b][c])).split('"').join(""), JSON.stringify(c).split('"').join(""));
			}
			if(b==pts.length-1){
				setTimeout(function(){
				updateWearing();
				},10000)
			}
			}, i*3000+2000)
	    }
		for (var i=1; i <= arr.length; i++) {
			setTimeout(function(){
			d++;
	        wearItem(arr[d].split('"').join(""));
			if(d==arr.length-1){
				setTimeout(function(){
				updateWearing();
				},10000)
			}
			}, i*3000+2000)
	    };
	};

	function removeItems() {
	    var items = $('.remove');
	    var str = "";
	    for (var i = 0; i < items.length; i++) {
	        str += items.eq(i).attr('onclick') + "\n";
	    };

	    eval(str)
	};
  function updateWearing() {
	    var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", "https://www.bloxcity.com/account/GetWearing.php", false);
	    xmlHttp.send(null);
	    document.getElementById("wearing-box").innerHTML = xmlHttp.responseText;
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var http = new XMLHttpRequest();
			http.open("GET", "https://www.bloxcity.com/account/getAvatar.php", false);
			http.send(null);
			document.getElementById("avatar").src = http.responseText;
		}
	}

	function wearItem(id) {
	    document.getElementById("avatar").src = "https://storage.googleapis.com/bloxcity-file-storage/assets/images/rolling.gif";
	    document.getElementById("avatar").style.margin = "0 auto";
	    var http = new XMLHttpRequest();
	    http.open("POST", "https://www.bloxcity.com/account/character-process.php", true);
	    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    http.send("action=wear&id=" + id);
	    document.getElementById("data-response").innerHTML = http.responseText;
	}

	function removeItem(id) {
	    document.getElementById("avatar").src = "https://storage.googleapis.com/bloxcity-file-storage/assets/images/rolling.gif";
	    document.getElementById("avatar").style.margin = "0 auto";
	    var http = new XMLHttpRequest();
	    http.open("POST", "https://www.bloxcity.com/account/character-process.php", true);
	    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    http.send("action=remove&id=" + id);
	}

	function changeColor(hex, activePart) {
	    $("#avatar").attr("src", "https://storage.googleapis.com/bloxcity-file-storage/assets/images/rolling.gif");
	    document.getElementById("avatar").style.margin = "0 auto";
	    document.getElementById(activePart).style.backgroundColor = hex;
	    var http = new XMLHttpRequest();
	    http.open("POST", "https://www.bloxcity.com/account/character-process.php", true);
	    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    http.send("action=color&type=" + activePart + "&hex=" + hex);
	}

	function rgb2hex(rgb) {
	    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	    return (rgb && rgb.length === 4) ? "#" +
	        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
	        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
	        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
	}
}