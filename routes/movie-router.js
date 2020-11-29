var express = require("express");
let router = express.Router();
const fs = require("fs");

router.get("/:movie", getMovie);

function getMovie(request, response) {
    response.redirect("/html/moviePage.html?movie=" + request.params.movie);
}

module.exports = router;