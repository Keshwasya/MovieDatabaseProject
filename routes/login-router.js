var express = require('express');
let router = express.Router();
const fs = require("fs");


router.post("/", login, (req,res,next) => {res.redirect("/html/homePage.html")});
router.get("/", logout, (req,res,next) => {res.redirect("/html/homePage.html")}); 
router.get("/check", userCheck); //sends the username to the client for dynamic navbar
router.get("/checkUserStatus", checkUserStatus);

//router.post("/", login); //redirects to homepage 
//router.get("/", logout); 

function checkUserStatus(request, response) {
    if (request.session.loggedin == true) {
        response.end("true");
        console.log("User: " + request.session.username + " logged in");
    } else {
        response.end("false");
        console.log("User not logged in");
    }
}

function userCheck(request, response){
	let result = request.session.username;
	response.end(JSON.stringify(result));
}

function login(request, response, next){ 
	if(request.session.loggedin == true){
		console.log("You are already logged in. You need to log out to log in");
		response.send("Unauthorized access");
		return;
	}

	/*for(let i=0; i<users.length;i++){
		if(users[i].username == request.query.user && users[i].password == request.query.pass){
			request.session.loggedin = true;
			request.session.username = request.query.user;
			request.session.password = request.query.pass;
			console.log("Logged in");
			response.end("True");
			return;
		}
	}*/
  
    let username = decodeURI(request.query.user);
    let password = decodeURI(request.query.pass);
    request.app.locals.db.collection("users").findOne({"username": username, "password": password}, function(err, user) {
       if (err) {
           throw err;
       } else if (user) {   //User is found
           request.session.loggedin = true;
           request.session.username = username;
           request.session.password = password;
           console.log("Logged in");
           response.end("True");
           return;
       } else {
           console.log("Wrong username or password");
	       response.end("False");
       }
    });
	//console.log(request.session.username);
	
	//request.session = Set-Cookie
	//request.session.loggedin = true;
	//request.session.username = request.query.user;
	//console.log(request.session);
	//response.send(request.session);
	//request.redirect("//html/homePage.html");
	//response.redirect(301,"/html/homePage.html");
	//next();
	
}

function logout(request, response, next){ //logout button on homepage does not work
	if(request.session.loggedin == true){ //if logged in then log cookie out
		request.session.loggedin = false;
		request.session.username = "";
		request.session.password = "";
		console.log("You have logged out");
		response.status(200);
	
	}else{
		console.log("You can't log out if you are not logged in")
		response.status(200);
	}
	next();
}

module.exports = router;