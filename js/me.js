const urlParams = new URLSearchParams(window.location.search);
const requestedUser = decodeURI(urlParams.get("username"));
console.log(requestedUser);
//let decodedPerson = decodeURIComponent(requestedPerson);

//me.js and me.html are for the logged in user

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
               $("<a href='" + encodeURI("/movie/" + encodeURI(movie)) + "'>" + movie + " </a>").appendTo("#recommended-movies");
            });
            
            $("#username").text(user.username);
            //$("#followed-users").text(user.followUser.toString());
            //$("#followed-people").text(user.peopleFollow.toString());
            $("#profile-image").attr("src", user.peopleFollow.profilePic);
        }
    });
});