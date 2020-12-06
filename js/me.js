const urlParams = new URLSearchParams(window.location.search);
const requestedUser = decodeURI(urlParams.get("username"));
console.log(requestedUser);
//let decodedPerson = decodeURIComponent(requestedPerson);

//me.js and me.html are for the logged in user

$.ajax({
    type: "GET",
    url: "/users/isContributor",
    success: function (data) {
        if (data !== "failed") {
            console.log("Appended contributor tools");
            $("<a></a>").addClass("dropdown-item").text("Add People").attr("href", "/html/addPerson.html").appendTo("#user-menu"); //Add people
            $("<a></a>").addClass("dropdown-item").text("Add Movie").attr("href", "/html/addMovie.html").appendTo("#user-menu");
        }
    }
});

$.getJSON('/users/users.json', function(data) { 
    $.each(data, function(i, user) {
        if (requestedUser === user.username) {
            usersList = [];
            peopleList = [];
            recommendedList = [];
            
            $("#profile-picture").attr("src", user.profilePic);
            
            //Adds links to followed users
            $.each(user.followUser, function(j, followedUser) {
                $("#followed-users").append("<a href='" + encodeURI("/users/" + followedUser) + "'>" + followedUser + " </a>");       
            });
        
            //
            $.each(user.peopleFollow, function(j, followedPerson) {
                $("#followed-people").append("<a href='" + encodeURI("/people/" + followedPerson) + ">" + followedPerson + " </a>");     
            });
           
           $.each(user.movies, function(j, movie) {
                /*$("#recommended-movies").append("<a href='" + encodeURI("/movies/" + movie) + ">" + movie + "</a>"); */
               $("<a href='" + encodeURI("/movies/" + encodeURI(movie)) + "'>" + movie + " </a>").appendTo("#recommended-movies");
            });
            
            $("#username").text(user.username);
            //$("#followed-users").text(user.followUser.toString());
            //$("#followed-people").text(user.peopleFollow.toString());
            $("#profile-image").attr("src", user.peopleFollow.profilePic);
        }
    });
});