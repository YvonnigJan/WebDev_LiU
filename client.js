/**
 * Created by cinna259 on 26/01/16.
 */

var sizeMinPwd = 6;

displayView = function() {
		document.getElementById("welcome").innerHTML = document.getElementById("welcomeview").innerHTML;
};

window.onload = function() {
	displayView();
};

logIn = function() {
	var pwd1 = document.forms["loginForm"]["password"];
	lengthPwd(pwd1);
};

signUp = function() {
	var pwd2 = document.forms["signUpForm"]["password"];
	var repeatPwd = document.forms["signUpForm"]["repeatPassword"];

	//lengthPwd(pwd2);
	checkPwds(pwd2,repeatPassword);
};

checkPwds = function(pw1, pw2) {
	if (pw1.value != pw2.value) {
		displayMsg("Error: both passwords must be identical","1");
	} else {
		displayMsg("","0");
	}
};

lengthPwd = function(pw) {
	if (pw.value.length < sizeMinPwd) {
		displayMsg("Password must be at least 6 characters long !","1");
	} else {
		displayMsg("","0");
	}

}

/* message : the message to be shown
state : 0 -> no error, 1 -> error */
displayMsg = function(message,state) {

	var errFrame = document.getElementById("displayMsg");

	errFrame.innerHTML = message;
	
	if (state == "1") {
		errFrame.style.border = "1px solid red";
		errFrame.style.backgroundColor = "white";
	}
		
	else if (state == "0") {
		errFrame.style.border = "";
		errFrame.style.backgroundColor = "";
	}

};