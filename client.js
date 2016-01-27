/**
 * Created by cinna259 on 26/01/16.
 */

displayView = function() {
		document.getElementById("welcome").innerHTML = document.getElementById("welcomeview").innerHTML;
};

window.onload = function() {
	displayView();
};