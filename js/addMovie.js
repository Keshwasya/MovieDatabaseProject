'use strict';

let req = null;

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

$("#submit").on("submit", function() {
    
});

//let btn = document.getElementById("submit");
//btn.onclick = addMovies;

/*function addMovies(){
    let Title = document.getElementById("Title").value;
    let Year = document.getElementById("Year").value;
    let Rated = document.getElementById("Rated").value;
    let imdbRating = parseInt(document.getElementById("imdbRating").value);
    let Runtime = document.getElementById("Runtime").value;
    let Poster = document.getElementById("Poster").value;
    let Director = document.getElementById("Director").value;
    let Actors = document.getElementById("Actors").value;
    let Language = document.getElementById("Language").value;
    let Writer = document.getElementById("Writer").value;
    let Genre = document.getElementById("Genre").value;
    let DVD = document.getElementById("DVD").value;
    let Country = document.getElementById("Country").value;
    let Plot = document.getElementById("Plot").value;
    if(Title == ""){
        alert("No Title entered");
        return false;
    }
    if(Poster == ""){
        alert("Poster URL not entered");
        return false;
    }
    if(Genre == ""){
        alert("No Genre entered");
        return false;
    }

    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let flag = this.responseText;
            if(flag === "True"){
                window.location = "http://localhost:3000/html/searchDatabase.html";
            }else{
                alert("Not authorized. Can't add movie to databse if not signed in");
            }
        }
    }
    req.open("POST", `http://localhost:3000/movies?Title=${Title}&Year=${Year}&Rated=${Rated}&imdbRating=${imdbRating}&Runtime=${Runtime}&Poster=${Poster}&Director=${Director}&Actors=${Actors}&Language=${Language}&Writer=${Writer}&Genre=${Genre}&DVD=${DVD}&Country=${Country}&Plot=${Plot}`);
    req.send();
    

    return true;
}*/