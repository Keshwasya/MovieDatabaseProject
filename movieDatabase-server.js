
const http = require('http');
const fs = require("fs");
var express = require('express');
var app = express();
let path = require('path');

app.use(express.static('/public'));
app.get('/', function(req,res){
    // console.log("reading");
});

let mimeLookup = {
	'.js': 'application/javascript',
	'.html': 'text/html',
	'.jpg': 'image/jpeg'
};

//Create a server, giving it the handler function
//Request represents the incoming request object
//Response represents the outgoing response object
//Remember, you can break this apart to make it look cleaner
const server = http.createServer(function (request, response) {
	console.log("URL: " + request.url);

	let fileurl;
	if (request.url == '/'){
		fileurl = '/homePage.html';
	}else{
		fileurl = request.url;
	}

	let filepath = path.resolve('./' + fileurl);
	console.log("URL Requested: " + filepath);
	if(request.method === "GET"){

		
		
		//Find the file's path using the path module
		//Be careful how you do this - you could give access to everything accidentally
		//let filepath = path.resolve('./' + fileurl);
		// lookup mime type of file
		//let fileExt = path.extname(filepath);
		//let mimeType = mimeLookup[fileExt];
		//response.writeHead(200, { 'content-type': mimeType });
			//pipe method is passing the data read from
			//the file into the response object
		


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
		}else if(request.url === filepath){
            fs.readFile(filepath, function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "image/jpeg");
				fs.createReadStream(filepath).pipe(response);
				response.end(data);
			});
		}else{
			response.statusCode = 404;
			response.end("Unknown resource (Url/Path).");
		}
		
	}else{
		response.statusCode = 404;
		response.end("Unknown resource (Url/Path).");
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');