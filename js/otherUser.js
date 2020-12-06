let req =null;
let usersObject;
let currentUsername; //Person logged in



const urlParams = new URLSearchParams(window.location.search);
const requestedUser = urlParams.get("username"); //Other person
//let decodedPerson = decodeURIComponent(requestedPerson);

//getUser();

$.getJSON('/users/users.json', function(data) { 
    usersObject = data;
    initPage();
});

function initPage() {
    $.each(usersObject, function(i, user) {
        if (requestedUser === user.username) { //Find other user
            $("#username").text(user.username);
            $("#profile-picture").attr("src", user.profilePic);
            $.each(user.followUser, function(j, followedUser) {
                $("#followed-users").append("<a href='" + encodeURI("/users/" + followedUser) + "'>" + followedUser + " </a>");       
            });
        
            $.each(user.peopleFollow, function(j, followedPerson) {
                $("#followed-people").append("<a href='" + encodeURI("/people/" + followedPerson) + ">" + followedPerson + " </a>");     
            });
           
           $.each(user.movies, function(j, movie) {
                /*$("#recommended-movies").append("<a href='" + encodeURI("/movies/" + movie) + ">" + movie + "</a>"); */
               $("<a href='" + encodeURI("/movies/" + encodeURI(movie)) + "'>" + movie + " </a>").appendTo("#recommended-movies");
            });
            
            $("#follow-btn").click(function(e) {
                e.stopPropagation();
                follow();
                return false;
            });
            
            $("#unfollow-btn").click(function(e) {
                e.stopPropagation();
                unfollow(); 
                return false;
            });
            
            updateFollowButton();
        }
    });
}

function isLoggedIn() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let flag = this.responseText;
            if (flag === "true") {   //If person is logged in
                return true;
            } else {
                return false;
            }
        }
    }
    
    req.open("GET", "http://localhost:3000/login/checkUserStatus");
    req.send();
}

function follow() {
    let req = new XMLHttpRequest();
    
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let flag = this.responseText;
            if (flag === "true") {   //If person is logged in
                console.log("Following user");
                req.open("POST", "http://localhost:3000/users/follow/" + requestedUser + "&" + currentUsername);
                req.send();
            } else {
                console.log("Invalid: user not logged in. Cannot follow.");
            }
        }
    }
    
    req.open("GET", "http://localhost:3000/login/checkUserStatus");
    req.send();
    
    updateFollowButton();
}

function unfollow() {
    let req = new XMLHttpRequest();
    
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let flag = this.responseText;
            if (flag === "true") {   //If person is logged in
                req.open("POST", "http://localhost:3000/users/" + requestedUser + "/unfollow/" + currentUsername);
                req.send();
            } else {
                console.log("Invalid: user not logged in. Cannot unfollow.");
            }
        }
    }
    
    req.open("GET", "http://localhost:3000/login/checkUserStatus");
    req.send();
    
    updateFollowButton();
}

function updateFollowButton() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let flag = this.responseText;
            if (flag == "true") {   //If current user follows other person
                $("#follow-btn").hide();
                $("#unfollow-btn").show();
            } else {
                $("#follow-btn").show();
                $("#unfollow-btn").hide();
            }
        }
    }
    
    req.open("GET", "http://localhost:3000/users/" + currentUsername + "/follows/" + requestedUser);
    req.send();
}