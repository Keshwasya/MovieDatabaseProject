var express = require("express");
let router = express.Router();
const fs = require("fs");

router.get("/:user", getUser);
router.get("/getUserData", getUserData);

let users = [];
//Will later on look at MongoDB database
fs.readFile('./users/users.json', (err, data) => {
    if (err) throw err;
    users = JSON.parse(data); // reads the json file and stores data into movies object array
});

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
    response.redirect("/html/me.html?username=" + request.params.user);
}

function getUserData(request, response) {
    if (request.session.loggedin == true) {
        let username = request.session.username;
        request.app.locals.db.collection("users").findOne({"username": username}, function(err, user) {
           if (err) {
               throw err;
           } else if (user) {
               console.log("User: " + username + " found");
               response.send(user);
               response.end();
           } else {
               console.log("Requested user: " + username + " not found.");
               response.status(404).send("failed");
           }
        });
    } else {    //User not logged in
        response.redirect("/html/login.html");
        response.end();
    }
}

module.exports = router;