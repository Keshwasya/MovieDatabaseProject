const urlParams = new URLSearchParams(window.location.search);
const requestedUser = urlParams.get("username");
console.log(requestedUser);
//let decodedPerson = decodeURIComponent(requestedPerson);

//getUser();

$.getJSON('/users/users.json', function(data) { 
    $.each(data, function(i, user) {
        if (requestedUser === user.username) {
            $("#username").text(user.username);
            $("#users-followed").text(user.followUser.toString());
            $("#people-followed").text(user.peopleFollow.toString());
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