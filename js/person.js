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

function addPersonInformation(role, movieTitle, result) {
    
    if (!(result.roles.includes(role))) { //If role isn't already added, add it
        result.roles.push(role);
        console.log("Role: " + role);
    }
    
    if (!(result.movieTitles.includes(movieTitle))) {
        result.movieTitles.push(movieTitle);
        console.log("Featured in: " + movieTitle);
    }
}


const urlParams = new URLSearchParams(window.location.search);
const requestedPerson = urlParams.get("personName");
let decodedPerson = decodeURIComponent(requestedPerson);

//console.log(decodedPerson);

let result = {roles: [], movieTitles: []};

//$.getJSON('/js/movie-data-short.json', function(data) { 
let req = new XMLHttpRequest();

req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let rowCount = 0;

        let data = JSON.parse(this.response);
        console.log(data);

        $.each(data, function(i, movie) { //Loop through movie database
            let decodedTitle = movie.Title.replace(/\s+/g, '');
            let strippedDirector;
            let strippedWriter;
            let strippedActor;

            //Look through actor, loop through writers (startsWith), and then actors
            if (movie.Director.toLowerCase().startsWith(decodedPerson.toLowerCase())) {
                //Do stuff
                addPersonInformation("Director", movie.Title, result);
                /*if (!(result.roles.includes("Director"))) {
                    result.roles.push("Director");
                }*/
            }

            let writerArray = movie.Writer.replace(/ *\([^)]*\) */g, " ").split(",");
            for (let j = 0; j < writerArray.length; j++) {
                if (writerArray[j].toLowerCase().startsWith(decodedPerson.toLowerCase())) {
                    //if (!(result.movieTitles.includes()))
                    addPersonInformation("Writer", movie.Title, result);
                }
            }

            let actorsArray = movie.Actors.replace(/ *\([^)]*\) */g, " ").split(",");
            for (let j = 0; j < actorsArray.length; j++) {
                if (actorsArray[j].toLowerCase().startsWith(decodedPerson.toLowerCase())) {
                    addPersonInformation("Actor", movie.Title, result);
                }
            }

        });

        $("#person-name").text(decodedPerson);
        $("#roles").text(result.roles.toString());
        $("#movies").text(result.movieTitles.toString());
    }
}

req.open("GET", "http://localhost:3000/people/getMoviesStarred/" + requestedPerson);
req.send();
