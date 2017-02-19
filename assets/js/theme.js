if (window.location.href.indexOf("https://www.bloxcity.com/") > -1) {
	setTheme()
	var theme = localStorage.getItem('opt_night_mode')
	function setTheme() {
		if(document.body && document.head) {
			if(theme=='true'){
				document.body.className = 'night-theme'
			}else{
				setTimeout(setTheme, 0)
			}
		}else{
				setTimeout(setTheme, 0)
			}
		}
}