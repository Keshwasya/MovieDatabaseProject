var express = require("express");
let router = express.Router();
const fs = require("fs");

router.get("/:person", searchPeople);
router.get("/getMoviesStarred/:person", getMoviesStarred);

let movies = [];
//Will later on look at MongoDB database
fs.readFile('./js/movie-data-short.json', (err, data) => {
    if (err) throw err;
    movies = JSON.parse(data); // reads the json file and stores data into movies object array
});

function addPersonInformation(name, role, movieTitle, result) {
    if (result.personName === "") {
        result.personName = name;
    }
    
    if (!(result.roles.includes(role))) { //If role isn't already added, add it
        result.roles.push(role);
    }
    
    if (!(result.roles.includes(movieTitle))) {
        result.movieTitles.push(movieTitle);
    }
}

function searchPeople(request, response) {
    let result = {personName: "", roles: [], movieTitles: []};
    //let name = decodeURIComponent(request.params.person);
    //console.log("Searching for: " + request.query);
    
    //Send person param to page
    response.redirect("/html/personPage.html?personName=" + request.params.person);
}

function getMoviesStarred(request, response) {
    let personName = request.params.person;
    let decodedName = decodeURI(personName);
    console.log("Searching for movies with " + decodedName);
    let foundMovies = request.app.locals.db.collection("movies").find({ $or: [{"Director": decodedName}, {"Writer": {$regex: decodedName}}, {"Actors": {$regex: decodedName}}]}).toArray(function(err, document) {
        if (err) {
            throw err;
        } else if (document) { //Exists
            console.log(document);
            response.send(document);
            response.end();
        } else {
            console.log("No movies found for person search");
        }
    });
}

module.exports = router;