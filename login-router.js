var express = require('express');
let router = express.Router();
const fs = require("fs");


//router.post("/", login, (req,res,next) => {res.redirect("http://127.0.0.1:3000/")}); //redirects to homepage 
router.post("/", login); //redirects to homepage 

function login(request, response, next){ 
	request.session.loggedin = true;
	request.session.username = request.query.user;
	//console.log(request.session);
	response.send(request.session);
	//request.redirect("http://127.0.0.1:3000/");
	//response.redirect(301,"http://127.0.0.1:3000/");
	//next();
	
}
module.exports = router;