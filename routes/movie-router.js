var express = require("express");
let router = express.Router();
const fs = require("fs");

router.get("/:movie", getMovie);

//Will later on look at MongoDB database
fs.readFile('./js/movie-data-short.json', (err, data) => {
    if (err) throw err;
    movies = JSON.parse(data); // reads the json file and stores data into movies object array
});

function getMovie(request, response) {
    response.redirect("/html/moviePage.html?movie=" + request.params.movie);
}

module.exports = router;