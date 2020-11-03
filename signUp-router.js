var express = require('express');
let router = express.Router();
const fs = require("fs");
const config = require("./config.json");
//var app = express();

router.nextUserID = config.nextUserID; //keeps track of the users id so we can give unique id's to new users

//post addUser route 
router.post("/", addUsers);


//adding new users
function addUsers(request, response){ // the js files send a post request at the URL addUser
	//create an empty user account
	let user = {username: "", password: "" , id: router.nextUserID ,profilePic: "", member : false, followUser: {}, peopleFollow: {}, movies: {}};
	router.nextUserID++; //keeps track of user id
	user.username = request.query.user; //fills in the new users username and password
	user.password  = request.query.pass;

	//console.log(user);

	//creates a user jason object file
	fs.writeFile("./users/" + user.id + "-" + user.username + ".json",JSON.stringify(user) ,function(err){
			if(err){
				console.log("Error creating user");
				console.log("err: " + err);
				response.status(500).send("You probsbely didn't write the file right");
			}
			response.json(user);
			console.log("user created");
			
	});
	
}

//module.exports = {addUsers};
module.exports = router;