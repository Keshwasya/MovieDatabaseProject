//Search movie database logic 
var express = require('express');
let router = express.Router();
const fs = require("fs");

//Rest API
router.get("/", searchMovies);
router.get("/title/:title", getTitle);
router.get("/genre/:genre", getGenre);
router.get("/year/:year", getYear);
router.get("/:movie", getMovie);

let movies = [];
fs.readFile('./public/database/movie-data-short.json', (err, data) => {
    if (err) throw err;
    movies = JSON.parse(data); // reads the json file and stores data into movies object array
    //console.log(movies); //prints all the movies from json file
});

function getMovie(request, response){
	let id = request.params.movie;

	let result = { movies: [] }; 

	for(let i = 0; i < movies.length; i++){
		if(movies[i].id == id){
			result.movies.push(movies[i]);
			break;
		}
	}
	 
	if(result.movies.length <= 0){
		console.log("No matches for GET /movies/: "+ id);
		response.end("No matches for GET /movies/: " + id);//if no match then error messsage
	}else{
		console.log("Displaying matches for id on browser");
		response.json(result); //return the ones that match the "id"
	}
}

function getYear(request, response){
	let year = request.params.year;

	let result = { movies: [] }; 

	for(let i = 0; i < movies.length; i++){
		if(movies[i].Year == year){
			result.movies.push(movies[i]);
		}
	}
	if(result.movies.length <= 0){
		console.log("No matches for GET /movies/year");
		response.json(movies);//if no match then return all movies
	}else{
		console.log("Displaying matches for year on browser");
		response.json(result); //return the ones that match the "Year"
	}

}

function getGenre(request, response){
	let genre = request.params.genre;
	let result = { movies: [] }; 
	
	for(let i = 0; i < movies.length; i++){
		if(movies[i].Genre.indexOf(genre) >= 0){
			result.movies.push(movies[i]);
		}
	}
	//console.log(result.movies.length);
	if(result.movies.length <= 0){
		console.log("No matches for GET /movies/genre");
		response.json(movies);//if no match then return all movies
	}else{
		console.log("Displaying matches for genre on browser");
		response.json(result); //return the ones that match the "Genre"
	}

}

function getTitle(request, response){
	let title = request.params.title;
	//console.log(title);
	//console.log(request.params);
	let result = { movies: [] }; 
	
	for(let i = 0; i < movies.length; i++){
		if(movies[i].Title.toLowerCase().startsWith(title.toLowerCase())){
			result.movies.push(movies[i]);
		}
	}
	//console.log(result.movies.length)
	if(result.movies.length <= 0){
		console.log("No matches for GET /movies/title");
		response.json(movies); //if no match then return all movies
	}else{
		console.log("Displaying matches for title on browser");
		response.json(result); //return the ones that match the "title"
	}

}


function searchMovies(request, response){ // the js files send a get request called /movie... this is how the server handles it 
	
	if(request.query.chars){ //the search input
		console.log("searching for: " + request.query.chars);
		let result = { movies: [] }; 
		for(let i = 0; i < movies.length; i++){
			if(movies[i].Title.toLowerCase().startsWith(request.query.chars.toLowerCase())){
				result.movies.push(movies[i]);//if input and movie title is the same then add to result array
			}
		}
		response.json(result); //sends back the movies that match
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

module.exports = router;