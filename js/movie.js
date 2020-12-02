const urlParams = new URLSearchParams(window.location.search);
const requestedMovie = urlParams.get("movie");
//let requestedMovieStripped = requestedMovie.replace(/\s+/g, '');
let requestedMovieStripped = encodeURI(requestedMovie);

//console.log(requestedMovieStripped);

/*function init(){ //displays correct nav bar items based on if the user is logged in or not  
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let username = this.responseText; //gets the username from server
            document.getElementById("navBtns").innerHTML = ""; //clears the navbar in case it had already been set

            if(username == "" || username.length == 2){ //if not logged in then these items will be added to the nav bar
                let navItems = '<li class="nav-item"> <a class="nav-link" href="/html/login.html"> <i class="fas fa-sign-in-alt" style="color: lightpink;"> </i> Login </a> </li> <li class="nav-item"> <a class="nav-link" href="/html/signUp.html"> <i class="fas fa-user-alt" style="color: lightpink;"> </i> Sign Up</a> </li> ';

                document.getElementById("navBtns").innerHTML = navItems;
                
            }else{ //if logged in then these items will be added to the nav bar
                let navItems = '<li class="dropdown dropleft">\
                                    <a class="nav-link dropdown-toggle" style="color: lightpink;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    ' + username.replace(/['"]+/g, '') +'</a>\
                                    <div class="dropdown-menu">\
                                        <a class="dropdown-item" href="#">User Page</a>\
                                        <a class="dropdown-item" onclick="logout()" href="#">Log Out</a>\
                                    </div>\
                                </li>'; // username.replace(/['"]+/g, '') gets rid of the double quotes around the
                                //THE HREF IN THE USER PAGE ITEM WILL LINK TO YOUR PAGE
                document.getElementById("navBtns").innerHTML = navItems;
            }
            //console.log("Username: " + username); //checking if username is correctly sent from server         
        }
    }
    
    req.open("GET", `http://localhost:3000/login/check`);  //checks what the username is
    req.send();
}

function logout(){
    req = new XMLHttpRequest();

    window.location.reload(); //reloads the page and resets the navbar
    req.open("GET",`http://localhost:3000/login`);
    req.send();
}*/
        //let strippedTitle = movie.Title.replace(/\s+/g, '');
$("#review").attr("action", "/movie/addReview/" + requestedMovieStripped);

$("#submit").submit(function(e) {   //Listener for submit
    e.preventDefault();
    console.log("Submit pressed");
    let request = new XMLHttpRequest();
    if (checkLogin == false) {
        alert("You must login first");
        window.location.replace("http://localhost:3000/html/login.html");
        return false;
    } else {
        request.open("POST", "http://localhost:3000/movie/addReview");
        request.send();
    }
});

let req = new XMLHttpRequest();
let reviewRequest = new XMLHttpRequest(); //req for reviews

reviewRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let data = $.parseJSON(this.response);
        
        $.each(data, function(i, review) {
            console.log("Review: " + review);
            let tableRow = $("<tr></tr>");
            let useCol = $("<td></td>").text();
        });
    }
}

req.onreadystatechange = function() {
    //let movie = this.response;
    if(this.readyState==4 && this.status==200){
        let movie = JSON.parse(this.response);
        console.log(movie);
        if (movie === "failed") {
            console.log("Movie not found");
            return;
        }

        let strippedTitle = encodeURI(movie.Title);
        let strippedDirector;
        let strippedWriter;
        let strippedActor;

            $("#title").text(movie.Title);
            $("#release").text(movie.Year);
                //$("#rating").text(movie.Ratings[0].Value); //IMDB rating
            $("#imdb-rating").text("IMDB Rating: " + movie.imdbRating + "/10"); //IMDB rating
            $("#metascore").text("Metascore: " + movie.Metascore + "/100");
            $("#time").text(movie.Runtime);
            $("#genre").text(movie.Genre);

                    //$("#director").text(movie.Director);

            $("<a>", {
                text: movie.Director,
                href: encodeURI("/people/" + movie.Director) //Removes spaces
            }).appendTo("#director");


                    //$("#writers").text(movie.Writer);
            let writerArray = movie.Writer.replace(/ *\([^)]*\) */g, " ").split(",");
                    //console.log(writerArray); //array of writers

                    //Removes all text within brackets and separates into elements of array

            for (let i = 0; i < writerArray.length; i++) {
                let writerName = writerArray[i];
                $("<a>", {
                    text: writerName,
                    href: encodeURI(("/people/" + writerName).trim())
                }).appendTo("#writers");
            }

                    //$("#actors").text(movie.Actors);
            let actorsArray = movie.Actors.split(",");
            for (let i = 0; i < actorsArray.length; i++) {
                let actorName = actorsArray[i].trim();
                $("<a>", {
                    text: actorName + " ",
                    href: encodeURI("/people/" + actorName)
                }).appendTo("#actors");
            }

            $("#summary").text(movie.Plot);
            $("#poster").attr("src", movie.Poster);
        
            reviewRequest.open("GET", "http://localhost:3000/movie/getArrayofReviews/" + strippedTitle);
            reviewRequest.send();
    }
}

req.open("GET", "http://localhost:3000/movie/getMovieData/" + requestedMovieStripped);
req.send();