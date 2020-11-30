'use strict';

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

//$.getJSON('/js/movie-data-short.json', function(data) { 
    let rowCount = 0;
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let data = $.parseJSON(this.response);
            //console.log("Data: " + data);
            
            $.each(data, function(i, movie) { //Loop through movie database
                let row;
                let column;
                let link;
                let image;
                let strippedTitle;

                if(i < 9){ //dispays only 9 movies from database 
                    if (rowCount < 3) {
                        row = $(".container-fluid .row").last();

                        rowCount++;
                    } else {
                        row = jQuery("<div>").addClass("row").appendTo();
                        row = $(".container-fluid .row").last();
                        rowCount = 0;
                    }

                    column = jQuery("<div>").addClass("col-sm").appendTo(row);
                    strippedTitle = encodeURI(movie.Title);
                    //strippedTitle = strippedTitle.replace(/\s+/g, '');  //Removes spaces
                    link = $("<a>", {
                        href: "/html/moviePage.html?movie=" + strippedTitle
                    }).appendTo(column);
                    image = $("<img />", {
                        src: movie.Poster,
                        alt: movie.Title
                    }).appendTo(link);
                }

            });
        }
    };

    req.open("GET", "http://localhost:3000/movie/getMovies/9");
    req.send();
    
//});
