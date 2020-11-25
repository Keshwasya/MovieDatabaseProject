var express = require('express');
let router = express.Router();
const fs = require("fs");

//post addUser route 
router.post("/", addUsers);

let users = [];
let usersNum = [];
fs.readFile('./users/users.json', (err, data) => {
    if (err) throw err;
    users = JSON.parse(data); // reads the json file and stores data into users object array
    
});
fs.readFile('./users/usersNum.json', (err, data) => {
    if (err) throw err;
    usersNum = JSON.parse(data); // reads the json file and stores data into users object array
    
});


//adding new users
function addUsers(request, response){ // the js files send a post request at the URL addUser

	
	for(let i=0;i<users.length;i++){ //only uniqe
		if(request.query.user === users[i].username){
			response.end("False");
			return;
		}
	}
	//if(request.session.loggedin){ // you can only create an acount if you are not logged in
		//create an empty user account
		usersNum++;
		let user = {username: "", password: "" , id: usersNum ,profilePic: "", member : false, followUser: {}, peopleFollow: {}, movies: {}};
		user.username = request.query.user; //fills in the new users username and password
		user.password  = request.query.pass;

		// Update id
		let writeStreamNum = fs.createWriteStream("./users/usersNum.json");
		writeStreamNum.write("["+ usersNum +"]");
		writeStreamNum.on('finish', () => {
			//console.log('ID Updated');
		});
		writeStreamNum.end();// close the stream

		//Add new user to users collection
		users.push(user);
		let writeStream = fs.createWriteStream("./users/users.json");
		writeStream.write(JSON.stringify(users));// write user to file
		writeStream.on('finish', () => {
			console.log('User Added');
		});
		writeStream.end();// close the stream
		//res.sendFile(__dirname + "/html/homePage.html");
	// }else{
	// 	console.log("You are logged in. Log out to create a new account.")
	// }

}

//module.exports = {addUsers};
module.exports = router;