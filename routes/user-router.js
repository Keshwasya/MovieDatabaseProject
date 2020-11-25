var express = require("express");
let router = express.Router();
const fs = require("fs");

router.post("/follow/:userToFollow&:user", followUser);
router.get("/:user", getUser);

let users = [];

//Will later on look at MongoDB database
fs.readFile('./users/users.json', (err, data) => {
    if (err) throw err;
    users = JSON.parse(data); // reads the json file and stores data into movies object array
});

function followUser(request, response) {
    let currentUser = decodeURI(request.params.user);
    let targetUser = decodeURI(request.params.userToFollow);
    
    //console.log("User " + currentUser + " following: " + targetUser);
    for(let i=0; i<users.length;i++){
        for(let x=0; x<users[i].followUser.length; x++){
            if ((users[i].username == currentUser) && !(targetUser === users[i].followUser[x])) { //If user not already followed target user
                users[i].followUser.push(targetUser);
                fs.writeFile("./users/users.json", JSON.stringify(users), function writeJSON(err) {
                if (err) throw err;
                    console.log("Succesfully followed user");
                    response.end("true");
                    return;
                });
            }
        }

    }
    response.end("false");
}

function getUser(request, response) {
    //let result = {personName: "", roles: [], movieTitles: []};
    //let name = decodeURIComponent(request.params.person);
    console.log("Loading person: " + request.params.user);
    
    /*for (let i = 0; i < users.length; i++) {
        if (request.query.user === users[i].username) {
            response.json(users[i]);
            break;
        }
    }*/
    
    //Send person param to page
    //response.redirect("/html/otherUserPage.html?username=" + request.params.username);
    response.redirect("/html/otherUserPage.html?username=" + request.params.user);
}

module.exports = router;