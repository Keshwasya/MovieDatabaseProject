'use strict';
const http = require('http');
const fs = require("fs");
var express = require('express');
var app = express();
let path = require('path');
const session = require('express-session')

let addUserRouter = require("./signUp-router.js"); //connects the signUp-router
let searchDatabaseRouter = require("./search-router.js"); //connects the search-router
//let loginRouter = require("./login-router.js"); //connects the search-router

const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;


app.use(express.static('/public'));
app.get('/', function(req,res){
    res.sendFile(__dirname + "/html/homePage.html");
});
app.get('/homePage.html', function(req,res){
    res.sendFile(__dirname + "/html/homePage.html");
});

app.use(session({ secret: 'some secret here'}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// app.use(session({
//     secret: 'some secret here',
//     proxy: true,
//     resave: true,
//     saveUninitialized: true
// }));

app.use("/", auth);

app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/html",auth, express.static(__dirname + "/html"));
app.use("/database", express.static(__dirname + "/database"));
app.use("/images", express.static(__dirname + "/images"));


app.use("/addUser", addUserRouter);
app.use('/movies', searchDatabaseRouter);

function auth(request, response, next){
	//console.log("authetication");
	if(request.session.loggedin){
		//console.log(request.session);
	}else{
		//console.log("Not logged in");
	}
	
	next();
}

app.post("/login", function login(request, response, next){ 
	request.session.loggedin = true;
	request.session.username = request.query.user;
	//console.log(request.session);
	response.send(request.session);
	//request.redirect("http://127.0.0.1:3000/");
	//response.redirect(301,"http://127.0.0.1:3000/");
	//next();
	
});

app.get("/login", function login(request, response, next){ 

	//console.log(request.session);
	//request.redirect("http://127.0.0.1:3000/");
	//response.redirect(301,"http://127.0.0.1:3000/");
	//next();
	
});

//app.use("/login", loginRouter);

//app.get('/movie', searchDatabase.searchMovies);
//app.post('/addUser', signUp.addUsers);

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