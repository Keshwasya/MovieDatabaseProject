var express = require("express");
let router = express.Router();
const fs = require("fs");

router.get("/:movie", getMovie);
router.get("/getMovieData/:movie", getMovieData);
router.get("/getMovies/:numOfMovies", getArrayofMovies);
router.post("/")

function getMovie(request, response) {
    response.redirect("/html/moviePage.html?movie=" + request.params.movie);
}

function getMovieData(request, response) {
    let movieName = decodeURI(request.params.movie);
    let requestedMovie = request.app.locals.db.collection("movies").findOne({"Title": movieName}, function(err, movie) {
       if (err) {
           throw err;
       } else if (movie) { //Movie found
           console.log("Movie: " + movieName + " found");
           response.send(movie);
           response.end();
       } else { //Movie not found
           console.log("Requested movie: " + movieName + " not found.");
           response.status(404).send("failed");
       }
    });
}

function getArrayofMovies(request, response) {
    let numOfMovies = parseInt(request.params.numOfMovies);
    console.log("Getting " + numOfMovies + " movies");
    let foundMovies = request.app.locals.db.collection("movies").find({}).limit(numOfMovies).toArray(function(err, document) {
        if (err) {
            throw err;
        }
        console.log(document);
        response.send(document);
        response.end();
    });
    //response.send(foundMovies);
}

module.exports = router;