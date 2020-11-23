let req =null;

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



const urlParams = new URLSearchParams(window.location.search);
const requestedUser = urlParams.get("username");
console.log(requestedUser);
//let decodedPerson = decodeURIComponent(requestedPerson);

//getUser();

$.getJSON('/users/users.json', function(data) { 
    $.each(data, function(i, user) {
        if (requestedUser === user.username) {
            $("#username").text(user.username);
            $.each(user.followUser, function(j, followedUser) {
                $("#followed-users").append("<a href='" + encodeURI("/users/" + followedUser) + "'>" + followedUser + "</a>");       
            });
        
            $.each(user.peopleFollow, function(j, followedPerson) {
                $("#followed-people").append("<a href='" + encodeURI("/people/" + followedPerson) + ">" + followedPerson + "</a>");     
            });
           
           $.each(user.movies, function(j, movie) {
                /*$("#recommended-movies").append("<a href='" + encodeURI("/movies/" + movie) + ">" + movie + "</a>"); */
               $("<a href='" + encodeURI("/movie/" + encodeURI(movie)) + "'>" + movie + "</a>").appendTo("#recommended-movies");
            });
        }
    });
});

/*function getUser() {
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            
            let result = JSON.parse(this.responseText);
            console.log(result);
            
            $("#username").text(result.username);
            $("#users-followed").text(result.followUser.toString());
            $("#people-followed").text(result.peopleFollow.toString);
            //Change profile pic
        }
    }
}*/