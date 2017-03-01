for (key in settings) {
	if (!localStorage.getItem(settings[key].id)) {
		localStorage.setItem(settings[key].id, settings[key].enabled);
		cobj[settings[key].id] = settings[key].enabled;

		chrome.runtime.sendMessage(cobj, function() {
  			console.log('Default settings saved.');
		});
	}
}


$(document).ready(function() {
	$('#more-links').append('<li class="divider"></li>');
	$('#more-links').append('<li><a href="https://www.bloxcity.com/bloxplus" style="font-size:16px;">Bloxplus</a></li>');
});

if (window.location.href.endsWith("/reply/")==true){
	var reply = document.getElementsByClassName("edit-hover")[0]
	reply.click()
}