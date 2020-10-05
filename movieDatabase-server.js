
const http = require('http');
const fs = require("fs");
let path = require('path');



let mimeLookup = {
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
			response.end("Unknown resource (Url/Path)mmm.");
		}
		
	}else{
		response.statusCode = 404;
		response.end("Unknown resource (Url/Path).");
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');