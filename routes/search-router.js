//Search movie database logic 
var express = require('express');
let router = express.Router();
const fs = require("fs");
const ObjectID = require('mongodb').ObjectID;

router.get("/search", searchMovies); //search bar
router.get("/genre/:genre", getGenre); //genre button


router.get("/title/:title", getTitle);
router.get("/year/:year", getYear);
// router.use("/", auth);

//Rest API
router.get("/", filterMovies);
router.get("/:movie", getMovie); //based on the movies id
router.post("/", addMovie);

function getMovie(request, response){
	let id = request.params.movie;
	let oid = new ObjectID(id);

	request.app.locals.db.collection("movies").findOne({"_id": oid}, function(err, result){
		if(err){
			response.status(500).send("Error reading database.");
			return;
		}
		if(!result){
			response.status(404).send("That ID does not exist.");
			return;
		}
		response.status(200).send(result);
	});

	
	
}




function addMovie(request, response){
	if(request.session.loggedin == true ){	//can only add movies if you have permissions  

		//!!!!*******VALIDATE ALL  THE PERAMETERS******!!!!// in the addMovies js file
		if(!request.query.Poster){
			//request.query.Poster  = "/images/no-poster.jpg";
		}

		console.log(request.query);
		let newMovie = request.query;
		request.app.locals.db.collection("movies").insertOne({newMovie}, function(err,result){
			if(err) throw err;
			
			console.log(request.query.Title + "Added to Database");
		});

		// movies.push(request.query);

		// let writeStream = fs.createWriteStream("./js/movie-data-short.json");

		// // write movies
		// writeStream.write(JSON.stringify(movies));

		// // the finish event is emitted when all data has been flushed from the stream
		// writeStream.on('finish', () => {
		// 	console.log('Movie Added');
		// });

		// // close the stream
		// writeStream.end();
	}else{
		console.log("Not authorized. Can't add movie to databse if not signed in");
		response.end("False");
	}
	response.end("True");

}

function filterMovies(request, response){
	let title;
	let genre;
	let year;
	let minrating;
	if(request.query.title){
		title = request.query.title;
	}else{
		title = "";
	}
	if(request.query.genre){
		genre = request.query.genre;
	}else{
		genre = "";
	}
	if(request.query.minrating){
		minrating = request.query.minrating;
	}else{
		minrating = 0;
	}

	if(request.query.year){
		year = request.query.year;
		let movies =  request.app.locals.db.collection("movies").find({$and:[ {"Title": {$regex: ".*"+title+".*", '$options' : 'i'}},{"Genre": {$regex: ".*"+genre+".*", '$options' : 'i'}},{"Year": {$eq: year}}, {"imdbRating": {$gte: parseInt(minrating)}}]}).toArray(function(err, result) {

			console.log(result);
			response.json(result);
			 
	
		});
	}else{
		let movies =  request.app.locals.db.collection("movies").find({$and:[ {"Title": {$regex: ".*"+title+".*", '$options' : 'i'}},{"Genre": {$regex: ".*"+genre+".*", '$options' : 'i'}},{"imdbRating": {$gte: parseInt(minrating)}} ]}).toArray(function(err, result) {

			console.log(result);
			response.json(result);
			 
	
		});
	}
	
	// let rating = [];
	// for(let i=0; i<9125;i++){
	// 	rating.push(Math.floor(Math.random() * 11));
	// }
	// //console.log(rating);
	// //console.log(rating[0]);
	// let count = 0;
	// title = "";
	// let movies = request.app.locals.db.collection("movies").find({"Title": {$regex: ".*"+title+".*", '$options' : 'i'}}).forEach(function(collname) {
	// 	//console.log(rating[count]);
	// 	request.app.locals.db.collection("movies").update({"Title": collname.Title}, {$set:{"imdbRating": rating[count]}},{ multi: true });
	// 	count++;
	// });
	
	// response.end();


	//console.log("Displaying GET/movies querys on browser. # of Results: " + minratingResult.length);
	
}


function getGenre(request, response){
	let genre = request.params.genre;

	if(genre == "All"){
		genre="";
	}

	request.app.locals.db.collection("movies").find({"Genre": {$regex: ".*"+genre+".*", '$options' : 'i'}}  ).toArray(function(err, result) {

		if(result.length <= 0 ){
			console.log("No matches for GET /movies/genre");
		}else{
			console.log("Displaying matches for /movies/genre on browser");
		}
		response.json(result);
		response.end(); 
	});

}


function searchMovies(request, response){ // the js files send a get request called /movie... this is how the server handles it 
	let title = request.query.chars;

	if(request.query.chars){ //the search input

		console.log("searching for: " + request.query.chars);
		request.app.locals.db.collection("movies").find( {"Title": {$regex: ".*"+title+".*", '$options' : 'i'}}).toArray(function(err, result) {
			response.json(result);//sends back the movies that match	
		});
	}else{ //if input empty dispay all
		console.log("getting all");
		request.app.locals.db.collection("movies").find({}).toArray(function(err, result) {
			if (err) {
				throw err;
			}
			response.json(result);
			response.end();
		});
	}
	
}

function auth(request,response,next){
	//console.log(request.session);
	response.send(JSON.stringify(request.session));
	next();
}

function getTitle(request, response){
	let title = request.params.title;
	
	request.app.locals.db.collection("movies").find( {"Title": {$regex: ".*"+title+".*", '$options' : 'i'}}).toArray(function(err, result) {
		if(result.length <=0){
			console.log("No matches for GET /movies/title");
		}else{
			console.log("Displaying matches for title on browser");
			response.json(result);//sends back the movies that match
		}
			
	});

}

function getYear(request, response){
	let year = request.params.year;

	request.app.locals.db.collection("movies").find({"Year": {$eq: year}} ).toArray(function(err, result) {
		if(result.length <=0){
			console.log("No matches for GET /movies/year");
		}else{
			console.log("Displaying matches for GET /movies/year on browser");
			response.json(result);//sends back the movies that match
		}
		 

	});
}
module.exports = router;