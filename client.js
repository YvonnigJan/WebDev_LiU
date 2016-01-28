/*
 * Authors:
 * Cindy Najjar
 * Jan Yvonnig
 */

var sizeMinPwd = 6;

displayView = function() {
		document.getElementById("page").innerHTML = document.getElementById("welcomeview").innerHTML;
};

window.onload = function() {
	displayView();
};

logIn = function() {
	//var pwd1 = document.forms["loginForm"]["password"];
	//lengthPwd(pwd1);
};

signUp = function() {

	var genderSelected = "male";

	if (document.getElementById("female").selected == true) {genderSelected = "female";}

	var repeatPwd = document.forms["signUpForm"]["repeatPassword"];

	var newUser = {
		'email': document.getElementById("emailSign").value,
		'password': document.getElementById("passwordSign").value,
		'firstname': document.getElementById("firstName").value,
		'familyname': document.getElementById("familyName").value,
		'gender': genderSelected,
		'city': document.getElementById("city").value,
		'country': document.getElementById("country").value,
	};

	if (!(newUser.password.length < sizeMinPwd) && (newUser.password == document.getElementById("repeatPassword").value)) {
		var servStubSign = serverstub.signUp(newUser);
		displayMsg(servStubSign.message,true);
	} else if (newUser.password != document.getElementById("repeatPassword").value) {
		displayMsg("Error: both passwords must be identical", false);
	} else if (newUser.password.length < sizeMinPwd) {
		displayMsg("Error: password must be at least 6 characters long", false);
	}
};

/** checkPwds = function(pw1, pw2) {
	return (pw1.value == pw2.value);
}; **/

/**lengthPwd = function(pwd) {
	return (pwd.value.length < sizeMinPwd);
};
*/

/* message (string) : the message to be shown
success (boolean) */
displayMsg = function(message,success) {

	var errFrame = document.getElementById("displayMsg");

	errFrame.innerHTML = message;
	errFrame.style.backgroundColor = "white";
	
	if (success == false) {
		errFrame.style.border = "1px solid red";
	}
		
	else if (success == true) {
		errFrame.style.border = "1px solid black";
	}
};