const http = require('http');
const fs = require("fs");
var express = require('express');
var app = express();
let path = require('path');
const session = require('express-session')

let addUserRouter = require("./routes/signUp-router.js"); //connects the signUp-router
let searchDatabaseRouter = require("./routes/search-router.js"); //connects the search-router
let loginRouter = require("./routes/login-router.js"); //connects the search-router
let peopleRouter = require("./routes/people-router.js");
let usersRouter = require("./routes/user-router.js");
let meRouter = require("./routes/me-router.js");
let movieRouter = require("./routes/movie-router.js");

const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;

let dbURL = "mongodb://localhost:27017/";


app.use(express.static('/public'));
app.get('/', function(req,res){
    res.sendFile(__dirname + "/html/homePage.html");
});
app.get('/homePage.html', function(req,res){
    res.sendFile(__dirname + "/html/homePage.html");
});

//app.use(session({ secret: 'some secret here'}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(session({
	secret: 'some secret here',
	proxy: true,
    resave: true,
	saveUninitialized: true,
	name:"UserDataCookie",
	cookie: {loggedin: false, username:"", password:""} //defult cookie values
}));

//app.use("/", auth);

app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/html", express.static(__dirname + "/html"));
app.use("/database", express.static(__dirname + "/database"));
app.use("/images", express.static(__dirname + "/images"));


app.use("/login", loginRouter);
app.use("/addUser", addUserRouter);
app.use('/movies', searchDatabaseRouter);
app.use("/movie", movieRouter);
app.use("/people", peopleRouter);
app.use("/me", meRouter);
app.get('/users/users.json', function(req,res){
    res.sendFile(__dirname + "/users/users.json");
});
app.use("/users", usersRouter);

function auth(request, response, next){
	if(request.session.loggedin){
		console.log(request.session);
	}else{
		//console.log(request.session);
		console.log("Not logged in");
	}
	next();
}

// app.post("/login", function login(request, response, next){
// 	console.log("logging in now");
// 	request.session.loggedin = true;
// 	request.session.username = request.query.user;


// 	//console.log(request.session);
// 	//response.send(request.session.username);
// 	//request.redirect("/html/homePage.html");
// 	//response.redirect(301,"/html/homePage.html");
// 	next();
	
// });

mongoClient.connect(dbURL, function(err, db) {
  if (err) throw err;
  console.log("Connected to db");
  let dbo = db.db("db");
  
  app.locals.db = dbo;
  
  //db.close();
  
  app.listen(3000);
  
  //Server listens on port 3000
  console.log('Server running at localhost:3000/');
});



/*let mimeLookup = {
	'.js': 'application/javascript',
	'.html': 'text/html',
	'.jpg': 'image/jpeg',
	'.png': 'image/png'
};server.listen(3000);*/