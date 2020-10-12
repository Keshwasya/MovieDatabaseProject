
const http = require('http');
const fs = require("fs");
var express = require('express');
var app = express();
let path = require('path');

const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;

app.use(express.static('/public'));
app.get('/', function(req,res){
    res.sendFile(__dirname + "/html/homePage.html");
});
app.get('/homePage.html', function(req,res){
    res.sendFile(__dirname + "/homePage.html");
});

app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/html", express.static(__dirname + "/html"));
app.use("/database", express.static(__dirname + "/database"));
app.use("/images", express.static(__dirname + "/images"));


//Search movie database logic 

let movies = [];
fs.readFile('./public/database/movie-data-short.json', (err, data) => {
    if (err) throw err;
    movies = JSON.parse(data);
    //console.log(movies); //prints all the movies from json file
});

app.get('/movie', (request, response) => {
	if(request.query.chars){
		console.log("searching for: " + request.query.chars);
		let result = { movies: [] };
		for(let i = 0; i < movies.length; i++){
			if(movies[i].Title.toLowerCase().startsWith(request.query.chars.toLowerCase())){
				result.movies.push(movies[i]);
			}
		}
		response.writeHead(200, { "Content-Type": "text/html"})
		response.end(JSON.stringify(result));
	}else{
		let result = { movies: [] };
		for(let i = 0; i < movies.length; i++){
			result.movies.push(movies[i]);
		}
		console.log("getting all");
		response.writeHead(200, { "Content-Type": "text/html"})
		response.end(JSON.stringify(result));
	}
	
});


app.listen(3000);

/*let mimeLookup = {
	'.js': 'application/javascript',
	'.html': 'text/html',
	'.jpg': 'image/jpeg',
	'.png': 'image/png'
};

//Create a server, giving it the handler function
//Request represents the incoming request object
//Response represents the outgoing response object
//Remember, you can break this apart to make it look cleaner
const server = http.createServer(function (request, response) {
	console.log("URL: " + request.url);

	if(request.method === "GET"){
		if(request.url === "/homePage.html" || request.url === "/" || request.url === "/homePage.html#top"){
			fs.readFile("homePage.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
                }
                
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.end(data);
			});
		}else if(request.url === "/userPage.html"){
            fs.readFile("userPage.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.end(data);
			});
		}else if(request.url === "/signUp.html"){
            fs.readFile("signUp.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.end(data);
			});
		}else if(request.url === "/searchDatabase.html"){
            fs.readFile("searchDatabase.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.end(data);
			});
		}else if(request.url === "/personPage.html"){
            fs.readFile("personPage.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.end(data);
			});
		}else if(request.url === "/otherUserPage.html"){
            fs.readFile("otherUserPage.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.end(data);
			});
		}else if(request.url === "/forgotPassword.html"){
            fs.readFile("forgotPassword.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.end(data);
			});
		}else if(request.url === "/moviePage.html"){
            fs.readFile("moviePage.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.end(data);
			});
		}else if(request.url === "/login.html"){
            fs.readFile("login.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.end(data);
			});
		}else if(request.url === "/database.css"){
            fs.readFile("database.css", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/css");
				response.end(data);
			});
		}else if(path.parse(request.url).dir === "/public"){
            fs.readFile("./public/" + path.parse(request.url).base, function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				if(path.extname(request.url) == ".jpg"){
					response.writeHead(200, {'content-type': 'image/jpg'});
				}else{
					response.writeHead(200, {'content-type': 'image/png'});
				}
				
				response.write(data);
				response.end();
				
			});
		}else{
			response.statusCode = 404;
			response.end("Unknown resource (Url/Path).");
		}
		
	}else{
		//post functions
		response.statusCode = 404;
		response.end("Unknown resource (Url/Path)mmm.");
	}
});

//Server listens on port 3000
server.listen(3000);*/
console.log('Server running at http://127.0.0.1:3000/');