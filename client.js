/**
 * Created by cinna259 on 26/01/16.
 */

var sizeMinPwd = 6;

displayView = function() {
		document.getElementById("page").innerHTML = document.getElementById("welcomeview").innerHTML;
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
		displayMsg("Error: both passwords must be identical","error");
	} else {
		displayMsg("","success");
	}
};

lengthPwd = function(pw) {
	if (pw.value.length < sizeMinPwd) {
		displayMsg("Password must be at least 6 characters long !","error");
	} else {
		displayMsg("","success");
	}

}

/* message : the message to be shown
state : error or success */
displayMsg = function(message,state) {

	var errFrame = document.getElementById("displayMsg");

	errFrame.innerHTML = message;
	
	if (state == "error") {
		errFrame.style.border = "1px solid red";
		errFrame.style.backgroundColor = "white";
	}
		
	else if (state == "success") {
		errFrame.style.border = "";
		errFrame.style.backgroundColor = "";
	}

};