var express = require("express");
let router = express.Router();
const fs = require("fs");

router.post("/", addMovie);
router.get("/:movie", getMovie);
router.get("/getMovieData/:movie", getMovieData);
router.get("/getMovies/:numOfMovies", getArrayofMovies);
router.get("/getArrayofReviews/:movie", getArrayofReviews);
router.post("/addReview/:movie", addReview);

function addMovie(request, response) {
    if (request.session.loggedin === true) {
        console.log("Adding movie: " + JSON.stringify(request.body));

        //Default values if not explicitly
        let year = 0;
        let imdbRating = 0;
        let language = "English";
        let genre = "N/A";
        let dvdDate = "N/A";
        let country = "N/A";
        let plot = "N/A";
        let poster = "/images/user-placeholder.png";
        let runtime = "";


        //Load actual value if not empty
        if (request.body.year !== "") year = request.body.year;

        if (request.body.imdbRating !== "") imdbRating = request.body.imdbRating;

        if (request.body.language !== "") language = request.body.language;

        if (request.body.genre !== "") genre = request.body.genre;

        if (request.body.DVD !== "") dvdDate = request.body.dvd;

        if (request.body.country !== "") country = request.body.country;

        if (request.body.plot !== "") plot = request.body.plot;

        if (request.body.poster !== "") poster = request.body.poster;

        if (request.body.runtime !== "") runtime = request.body.runtime;

        let newMovie = {"Title": request.body.title, "Year": year, "Rated": request.body.rated, "Runtime": runtime, "Genre": genre, "Director": request.body.director, "Writer": request.body.writer, "Actors": request.body.actors, "Plot": plot, "Language": language, "Country": country, "Poster": poster, "imdbRating": imdbRating, "DVD": dvdDate, "review": [{}]};
        request.app.locals.db.collection("movies").insertOne(newMovie);
        
        response.redirect("http://localhost:3000/movies/" + encodeURI(request.body.title));
    } else {
        response.redirect("http://localhost:3000/html/login.html");
        console.log("Non-user attempted to add movie");
    }
}

function getMovie(request, response) {
    response.redirect("/html/moviePage.html?movie=" + request.params.movie);
}

function getMovieData(request, response) {
    let movieName = decodeURI(request.params.movie);
    
    request.app.locals.db.collection("movies").createIndex({"Title": 1}, {collation: {locale: "en", strength: 2}});
    
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
        response.send(document);
        response.end();
    });
    //response.send(foundMovies);
}

function getArrayofReviews(request, response) {
    let movieName = decodeURI(request.params.movie);
    
    //Check if review object is empty, then send different
    
    let reviewsObject = request.app.locals.db.collection("movies").findOne({"Title": movieName}, {"fields": {"review": 1, _id: 0}}, function(err, document) {
        if (err) {
            throw err;
        }
        console.log("Review object loaded: " + JSON.stringify(document.review));
        response.send(document.review);
        response.end();
    });
    //response.send(reviewsObject); //Send review field, excludes _id field.
    //response.end();
    
}

function addReview(request, response) {
    let movieName = decodeURI(request.params.movie);
    
    if (request.session.loggedin == true) {
        let reviewObject = { "username": request.session.username,  "basicRating": request.body.basicRating, "fullReview": request.body.fullReview};
        //Updates movie with title == movieName
        
        request.app.locals.db.collection("movies").update({"Title": movieName}, {$push: {"review": reviewObject}});
        console.log("User: " + request.session.username + " added review to " + movieName);
    } else { //If not logged in, direct to login page
        response.redirect("http://localhost:3000/html/login.html");
        console.log("User not logged in while attempting review.");
    }
    let rating = request.body.fullReview;
    console.log(rating);
    console.log(request.body.basicRating);
    response.redirect("/movies/" + request.params.movie);
    response.end();
}

module.exports = router;