'use strict';

let req = null;

function init(){ //displays all movies in database when page loads and loads dynamic navbar
    req = new XMLHttpRequest();
    /*req.onreadystatechange = function() {
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
    req.send();*/
    
    
    //displaying movies   
    $.getJSON("/js/movie-data-short.json", function(data) { 
        let rowCount = 0;
        $.each(data, function(i, movie) { //Loop through movie database
            let row;
            let column;
            let link;
            let image;
            let strippedTitle;

            if (rowCount < 3) {
                row = $(".container-fluid .row").last();

                rowCount++;
            } else {
                row = jQuery("<div>").addClass("row").appendTo();
                row = $(".container-fluid .row").last();
                rowCount = 0;
            }

        
            column = jQuery("<div>").addClass("col-sm").appendTo(row);
            strippedTitle = movie.Title;
            strippedTitle = strippedTitle.replace(/\s+/g, '');  
            link = $("<a>", {
                href: "/html/moviePage.html?movie=" + strippedTitle
            }).appendTo(column);
            image = $("<img />", {
                src: movie.Poster,
                alt: movie.Title,
            }).appendTo(link);
        });
    });
}

/*function logout(){
    req = new XMLHttpRequest();

    window.location.reload(); //reloads the page and resets the navbar
    req.open("GET",`http://localhost:3000/login`);
    req.send();
}*/


let box = document.getElementById("searchBar");
box.oninput = getMovies;

function getMovies(){
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let div = document.getElementById("moviePosters");
            div.innerHTML = "";
            let result = JSON.parse(this.responseText);
            if(result.movies.length == 0){
                let text = '<h5 style="text-align: center;">Sorry no matches to search.  ¯\\_(ツ)_/¯<br><br><br><br><br><br></h5>';

                document.getElementById("noMatch").innerHTML = text;
            }else{
                document.getElementById("noMatch").innerHTML = "";
            }            

            let rowCount = 0;
            for(let x=0;x<result.movies.length;x++){
                console.log(result.movies[x]);

                let row;
                let column;
                let link;
                let image;
                let strippedTitle;

                if (rowCount < 3) {
                    row = $(".container-fluid .row").last();

                    rowCount++;
                } else {
                    row = jQuery("<div>").addClass("row").appendTo();
                    row = $(".container-fluid .row").last();

                    rowCount = 0;
                }

                column = jQuery("<div>").addClass("col-sm").appendTo(row);
                strippedTitle = result.movies[x].Title;
                strippedTitle = strippedTitle.replace(/\s+/g, '');  //Removes spaces
                link = $("<a>", {
                    href: "/html/moviePage.html?movie=" + strippedTitle
                }).appendTo(column);
                image = $("<img />", {
                    src: result.movies[x].Poster,
                    alt: result.movies[x].Title,
                    id: result.movies[x].Title
                }).appendTo(link);
            }            
        }
    }
    
    //Making a GET request to a server on the local computer
    //The resource requests is /movie
    //A query string is included specifying the search query
    //req.open("GET", `http://localhost:3000/movies?chars=${box.value}`);
    req.open("GET", `http://localhost:3000/movies/search?chars=${box.value}`);
    req.send();
}

function getGenre(genre){

    $("#moviePosters").empty(); //clears old posters
    $("#noMatch").empty(); //clears old no match message if it exists

    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let result = JSON.parse(this.responseText);
            if(result.movies){  //if there are movies in that genre
                let rowCount = 0;

                for(let x=0;x<result.movies.length;x++){
                    console.log(result.movies[x]);
    
                    let row;
                    let column;
                    let link;
                    let image;
                    let strippedTitle;
    
                    if (rowCount < 3) {
                        row = $(".container-fluid .row").last();
    
                        rowCount++;
                    } else {
                        row = jQuery("<div>").addClass("row").appendTo();
                        row = $(".container-fluid .row").last();
    
                        rowCount = 0;
                    }
    
                    column = jQuery("<div>").addClass("col-sm").appendTo(row);
                    strippedTitle = result.movies[x].Title;
                    strippedTitle = strippedTitle.replace(/\s+/g, '');  //Removes spaces
                    link = $("<a>", {
                        href: "/html/moviePage.html?movie=" + strippedTitle
                    }).appendTo(column);
                    image = $("<img />", {
                        src: result.movies[x].Poster,
                        alt: result.movies[x].Title,
                        id: result.movies[x].Title
                    }).appendTo(link);
                } 
            }else{ //if no movies in this genre
                let div = document.getElementById("moviePosters");
                div.innerHTML = "";  
                let text = '<h5 style="text-align: center;">Sorry no matches for this genre.  ¯\\_(ツ)_/¯<br><br><br><br><br><br></h5>';
                document.getElementById("noMatch").innerHTML = text;
            }
                 
            

                       
        }
    }
    req.open("GET", `http://localhost:3000/movies/genre/${genre}`);
    req.send();
}






//JQuery way of doing it.

// function searchBar(){

//     $("#test").empty(); //gets rid of old searchs
    
//     $.getJSON('/database/movie-data-short.json', function(data) { 
//         let rowCount = 0;
        
//         $.each(data, function(i, movie) { //Loop through movie database
//             if(movie.Title.toLowerCase().startsWith(document.getElementById("searchBar").value)){
//                 console.log(movie.Title);

//                 let row;
//                 let column;
//                 let link;
//                 let image;

//                 if (rowCount < 3) {
//                     row = $(".container-fluid .row").last();

//                     rowCount++;
//                 } else {
//                     row = jQuery("<div>").addClass("row").appendTo();

//                     rowCount = 0;
//                 }

//                 column = jQuery("<div>").addClass("col-sm").appendTo(row);
//                 link = $("<a>", {
//                     href: ""
//                 }).appendTo(column);
//                 image = $("<img />", {
//                     src: movie.Poster,
//                     alt: movie.Title
//                 }).appendTo(link);
//             }           
//         });
//     });
// }