const { request } = require('express');
var express = require('express');
let router = express.Router();
const fs = require("fs");


router.post("/", login, (req,res,next) => {res.redirect("/html/homePage.html")});
//router.get("/", logout); 
//router.post("/", login); //redirects to homepage 

let users = [];
fs.readFile('./users/users.json', (err, data) => {
    if (err) throw err;
    users = JSON.parse(data); // reads the json file and stores data into users object array
    
});

function login(request, response, next){ 
	if(request.session.loggedin){ //Can only log in once
		console.log("Already logged in");
		response.status(401).send("already logged in");
		return;
	}

	for(let i=0; i<users.length;i++){
		if(users[i].username == request.query.user && users[i].password == request.query.pass){
			request.session.loggedin = true;
			request.session.username = request.query.user;
			request.session.password = request.query.pass;
			break;
		}
	}
	next();
	
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
	if(request.session.loggedin){ //if logged in then log cookie out
		request.session.loggedin = false;
		request.session.username = "";
		request.session.password = "";
		console.log("You have logged out");
	}else{
		console.log("You are not logged in")
	}
	next();
}

module.exports = router;