//Search movie database logic 
var express = require('express');
let router = express.Router();
const fs = require("fs");


//
router.get("/", searchMovies);


let movies = [];
fs.readFile('./public/database/movie-data-short.json', (err, data) => {
    if (err) throw err;
    movies = JSON.parse(data); // reads the json file and stores data into movies object array
    //console.log(movies); //prints all the movies from json file
});

//make this a router
function searchMovies(request, response){ // the js files send a get request called /movie... this is how the server handles it 
	
	if(request.query.chars){ //the search input
		console.log("searching for: " + request.query.chars);
		let result = { movies: [] }; 
		for(let i = 0; i < movies.length; i++){
			if(movies[i].Title.toLowerCase().startsWith(request.query.chars.toLowerCase())){
				result.movies.push(movies[i]);//if input and movie title is the same then add to result array
			}
		}
		response.writeHead(200, { "Content-Type": "text/html"})
		response.end(JSON.stringify(result));
	}else{ //if input empty dispay all
		let result = { movies: [] };
		for(let i = 0; i < movies.length; i++){
			result.movies.push(movies[i]);
		}
		console.log("getting all");
		response.writeHead(200, { "Content-Type": "text/html"})
		response.end(JSON.stringify(result));
	}
	
}

//module.exports = {searchMovies};
module.exports = router;