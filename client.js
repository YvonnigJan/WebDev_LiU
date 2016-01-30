/*
 * Authors:
 * Cindy Najjar
 * Jan Yvonnig
 */

var sizeMinPwd = 6;
var maxSizeMsg = 300;

displayView = function() {
	if (localStorage.getItem("token") == null) {
		document.getElementById("page").innerHTML = document.getElementById("welcomeview").innerHTML;
	} else {
		document.getElementById("page").innerHTML = document.getElementById("profileview").innerHTML;
	}
};

window.onload = function() {
	displayView();
	if (localStorage.getItem("token") != null) {
		displayInfo();
		keepMsg();
	}	
};

logIn = function() {
	var username = document.getElementById("emailLog").value;
	var password = document.getElementById("passwordLog").value;
	if (password.length >= sizeMinPwd) {
		var servStubLog = serverstub.signIn(username, password);
		if (servStubLog.success == true) {
			localStorage.setItem("token", servStubLog.data);
			location.reload();
		} else {
			displayMsg(servStubLog.message, false, "welcomeview");
		}
	} else {
		displayMsg("Username or password is incorrect",false,"welcomeview");
	}
};

logOut = function() {
	var token = localStorage.getItem("token");

	if (token != null) {
		var servStubLogOut = serverstub.signOut(token);
		localStorage.removeItem("token");
	}

	//to display the welcome page after the user signs out
	location.reload();
};

signUp = function() {
	var genderSelected = "male";
	if (document.getElementById("female").selected == true) {genderSelected = "female";}

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
		displayMsg(servStubSign.message,true,"welcomeview");
	} else if (newUser.password != document.getElementById("repeatPassword").value) {
		displayMsg("Error: both passwords must be identical", false, "welcomeview");
	} else if (newUser.password.length < sizeMinPwd) {
		displayMsg("Error: password must be at least 6 characters long", false, "welcomeview");
	}
};

/* message (string) : the message to be shown
success (boolean) */
displayMsg = function(message,success,view) {

	var errFrame = document.getElementById("displayMsg");
	
	if (view == "profileview") {
		errFrame = document.getElementById("displayMsgProfile");
	}

	errFrame.innerHTML = message;
	errFrame.style.backgroundColor = "white";
	
	if (success == false) {
		errFrame.style.border = "1px solid red";
	}
		
	else if (success == true) {
		errFrame.style.border = "1px solid black";
	}
};

/* displays the panel of the tab parameter */
tabClicked = function(tab) {
	if (tab == 'home') {
		document.getElementById("home-panel").style.display = "block";
		document.getElementById("account-panel").style.display = "none";
		document.getElementById("browse-panel").style.display = "none";
	} else if (tab == 'account') {
		document.getElementById("account-panel").style.display = "block";
		document.getElementById("home-panel").style.display = "none";
		document.getElementById("browse-panel").style.display = "none";
	} else if (tab == 'browse') {
		document.getElementById("browse-panel").style.display = "block";
		document.getElementById("account-panel").style.display = "none";
		document.getElementById("home-panel").style.display = "none";
	}
};

/* enables a user to change his password */
changePwd = function() {
	var token = localStorage.getItem("token");
	var oldPassword = document.getElementById("oldPwd").value;
	var newPassword = document.getElementById("chgPwd").value;

	if (newPassword.length >= sizeMinPwd) {
		var servStubChg = serverstub.changePassword(token, oldPassword, newPassword);
		displayMsg(servStubChg.message, true, "profileview");
	} else {
		displayMsg("Error: password must be at least 6 characters long", false, "profileview");
	}
};

displayInfo = function() {
	var token = localStorage.getItem("token");
	var servStubInfo = serverstub.getUserDataByToken(token);

	document.getElementById("mail-span").innerHTML = servStubInfo.data.email;
	document.getElementById("firstname-span").innerHTML = servStubInfo.data.firstname;
	document.getElementById("familyname-span").innerHTML = servStubInfo.data.familyname;
	document.getElementById("gender-span").innerHTML = servStubInfo.data.gender;	
	document.getElementById("city-span").innerHTML = servStubInfo.data.city;
	document.getElementById("country-span").innerHTML = servStubInfo.data.country;
};

/* stores the message in the array
to -> false : no other recipient */
send = function(msg,from,to) {
    
    var token = localStorage.getItem("token");
    var servStubPost = serverstub.postMessage(token,msg,from);
	if(servStubPost.success == true) {
		document.getElementById("mess").value = "";
		displayMsg(servStubPost.message, true, "profileview");
        keepMsg();
	} else {
        displayMsg(servStubPost.message, false, "profileview");
    }
};

msgOnWall = function() {

	var token = localStorage.getItem("token");

	var msg = document.getElementById("mess").value;
    if ((msg.length <= maxSizeMsg) && (msg.length > 0)) {
        var servStubData = serverstub.getUserDataByToken(token);
    	if (servStubData.success == true) {
            send(msg, servStubData.data.email, false);
            displayMsg(servStubData.message, true, "profileview");
        } else {
            displayMsg(servStubData.message, false, "profileview");
        }
    } else {
        displayMsg("Message too short or too long", false, "profileview");
    }
};

keepMsg = function() {

	var messageArea = document.getElementById("mess");
	var token = localStorage.getItem("token");
	var txt = serverstub.getUserMessagesByToken(token);
	var mess = serverstub.getUserMessagesByToken(token).data;

	if (messageArea && txt) {
        if(txt.success == true) {
        	
        	while (document.getElementById("wall").firstChild) {
    			document.getElementById("wall").removeChild(document.getElementById("wall").firstChild);
			}
        	
        	for	(j = 0; j < mess.length; j++) {
	            var para = document.createElement("p");
	            var msg = document.createTextNode("'"+mess[j].content+"' written by "+mess[j].writer);
	            para.appendChild(msg);
	          	document.getElementById("wall").appendChild(para);
        	}
        } else {
            displayMsg(txt.message, true, "profileview");
        }
    } else {
        displayMsg("ERROR!", false, "profileview");
    }
};