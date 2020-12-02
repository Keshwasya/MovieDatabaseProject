var express = require("express");
let router = express.Router();
const fs = require("fs");

router.get("/:movie", getMovie);
router.get("/getMovieData/:movie", getMovieData);
router.get("/getMovies/:numOfMovies", getArrayofMovies);
router.get("/getArrayofReviews/:movie", getArrayofReviews);
router.post("/addReview/:movie", addReview);

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
        response.send(document);
        response.end();
    });
    //response.send(foundMovies);
}

function getArrayofReviews(request, response) {
    let movieName = decodeURI(request.params.movie);
    let reviewsObject = request.app.locals.db.collection("movies").findOne({"Title": movieName}, {"review": 1, _id: 0}, function(err, reviews) {
        if (err) {
            throw err;
        }
        console.log("Review object loaded: " + JSON.stringify(reviews));
        response.send(reviews);
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
        request.app.locals.db.collection("movies").update({"Title": movieName}, {$set: {"review": reviewObject}});
        console.log("User: " + request.session.username + " added review to " + movieName);
    } else { //If not logged in, direct to login page
        response.redirect("http://localhost:3000/html/login.html");
        console.log("User not logged in while attempting review.");
    }
    let rating = request.body.fullReview;
    console.log(rating);
    console.log(request.body.basicRating);
    response.end();
}

module.exports = router;