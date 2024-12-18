var express = require("express");
let router = express.Router();
const fs = require("fs");

router.post("/follow/:userToFollow&:user", followUser);
router.post("/:user/unfollow/:targetUser", unfollowUser);
router.get("/:user/follows/:targetUser", checkFollow);
router.get("/isContributor", isContributor);
router.get("/:user", getUser);

let users = [];

//Will later on look at MongoDB database
fs.readFile('./users/users.json', (err, data) => {
    if (err) throw err;
    users = JSON.parse(data); // reads the json file and stores data into movies object array
});

function checkFollow(request, response) {
    let currentUser = decodeURI(request.params.user);
    let targetUser = decodeURI(request.params.targetUser);
    
    for (let i = 0; i < users.length; i++) {
        if ((users[i].username == currentUser) && (targetUser in users[i].followUser)) {
            console.log(currentUser + " follows " + targetUser);
            response.send("true");
            response.end();
            return; //Logs message and exits function
        }
    }
    
    console.log(currentUser + " doesn't follow " + targetUser);
    response.end("false");
}

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
                    response.send("true");
                    response.end();
                    return;
                });
            }
        }

    }
    response.end("false");
}

function unfollowUser(request, response) {
    let currentUser = decodeURI(request.params.user);
    let targetUser = decodeURI(request.params.userToFollow);
    console.log("User " + currentUser + " unfollowing: " + targetUser);
    for(let i=0; i<users.length;i++){
        if ((users[i].username == currentUser) && (targetUser in users[i].followUser)) { //If user not already followed target user
            users[i].followUser.splice(users[i].followUser.indexOf(targetUser), 1);
            fs.writeFile("./users/users.json", JSON.stringify(users), function writeJSON(err) {
               if (err) throw err;
                console.log("Succesfully unfollowed user");
                response.send("true");
                response.end();
                return;
            });
        }
    }
    response.send("false");
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

function isContributor(request, response) {
    if (request.session.loggedin === true) { //Person is logged in
        let username = request.session.username;
        let isContributor = request.app.locals.db.collection("users").findOne({"username": username}, {"fields": {"contributor": 1, _id: 0}}, function(err, document) {
            if (err) {
                throw err;
            }
            console.log("User: " + username + " isContributor: " + JSON.stringify(document.contributor));
            response.send(document.contributor.toString());
            response.end();
        });
    } else {
        console.log("User not logged in, attempting isContributor");
        response.send("false");
        response.end();
    }
}

module.exports = router;