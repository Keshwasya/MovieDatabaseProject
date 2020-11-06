//Search movie database logic 
var express = require('express');
let router = express.Router();
const fs = require("fs");

router.get("/search", searchMovies); //search bar
router.get("/genre/:genre", getGenre); //genre button

router.get("/title/:title", getTitle);
router.get("/year/:year", getYear);

//Rest API
router.get("/", filterMovies);
router.get("/:movie", getMovie); //based on the movies id
router.post("/", addMovie);


let movies = [];
//fs.readFile('./public/database/movie-data-short.json', (err, data) => {
fs.readFile('./js/movie-data-short.json', (err, data) => {
    if (err) throw err;
    movies = JSON.parse(data); // reads the json file and stores data into movies object array
    //console.log(movies); //prints all the movies from json file
});

function addMovie(request, response){
	if(!request.query.Poster){
		//request.query.Poster  = "/images/no-poster.jpg";
	}

	movies.push(request.query);

	let writeStream = fs.createWriteStream("./js/movie-data-short.json");

	// write movies
	writeStream.write(JSON.stringify(movies));

	// the finish event is emitted when all data has been flushed from the stream
	writeStream.on('finish', () => {
		console.log('Movie Added');
	});

	// close the stream
	writeStream.end();

}

function filterMovies(request, response){
	let minratingResult = { movies: [] }; 
	let titleResult = { movies: [] };
	let genreResult = { movies: [] };
	let yearResult = { movies: [] };

	if(request.query.title){ //if title peramter has been set
		let title = request.query.title;
		 
		for(let i = 0; i < movies.length; i++){ 
			if(movies[i].Title.toLowerCase().startsWith(title.toLowerCase())){ //title filters
				titleResult.movies.push(movies[i]);
			}
		}
	}else{ //if no title in perameter then all movies
		titleResult.movies = movies;
	}
	//trickles the titleResults to the genre filter
	if(request.query.genre){ //if genre perameter has been set
		let genre = request.query.genre;
		
		for(let i = 0; i < titleResult.movies.length; i++){
			if(titleResult.movies[i].Genre.indexOf(genre) >= 0){ //genre filter
				genreResult.movies.push(titleResult.movies[i]);
			}
		}
	}else{
		
		genreResult.movies = titleResult.movies;
	}
	//if no title and no genre in perameter then all movies get trickled down to year filter 
	//if no title but a genre in perameter then genreResults gets trickled down to year filter
	//if title but no genre in perameter then titleResults becomes genreResults and genreResults gets trickled down to year filter
	//if title and genre then genreResults is combo of title and genre and it gets trickled down to year filter
	if(request.query.year){ //if year perameter is set
		let year = request.query.year;

		for(let i = 0; i < genreResult.movies.length; i++){
			if(genreResult.movies[i].Year == year){ //year filter
				yearResult.movies.push(movies[i]);
			}
		}
	}else{
		yearResult.movies = genreResult.movies;
	}
	//console.log("the title, genre, and year: ");
	//console.log(yearResult);
	if(request.query.minrating){
		let minrating = request.query.minrating;
		//console.log(parseInt(minrating));
		//console.log(yearResult.movies[0].imdbRating);
		for(let i = 0; i < yearResult.movies.length; i++){
			//console.log(minratingResult.movies[i].imdbRating);
			
			if(parseInt(yearResult.movies[i].imdbRating) >= parseInt(minrating)){ //min rating filter
				minratingResult.movies.push(movies[i]);
			}
		}

	}else{
		minratingResult.movies = yearResult.movies;
	}

	console.log("Displaying GET/movies querys on browser");
	response.json(minratingResult);
}

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
		console.log("Displaying matches for GET /movies/:movies on browser");
		response.json(result); //return the ones that match the "id"
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
	if(genre == "All"){
		console.log("Displaying matches for /movies/genre on browser");
		result.movies = movies;
		response.json(result); //return all movies
	}else if(result.movies.length <= 0){
		console.log("No matches for GET /movies/genre");
		response.json(movies);//if no match then return all movies
	}else{
		console.log("Displaying matches for /movies/genre on browser");
		response.json(result); //return the ones that match the "Genre"
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

function getTitle(request, response){
	let title = request.params.title;
	let result = { movies: [] }; 
	
	for(let i = 0; i < movies.length; i++){
		if(movies[i].Title.toLowerCase().startsWith(title.toLowerCase())){
			result.movies.push(movies[i]);
		}
	}
	if(result.movies.length <= 0){
		console.log("No matches for GET /movies/title");
		response.json(movies); //if no match then return all movies
	}else{
		console.log("Displaying matches for title on browser");
		response.json(result); //return the ones that match the "title"
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
		console.log("Displaying matches for GET /movies/year on browser");
		response.json(result); //return the ones that match the "Year"
	}

}
module.exports = router;