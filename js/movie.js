const urlParams = new URLSearchParams(window.location.search);
const requestedMovie = urlParams.get("movie");
//let requestedMovieStripped = requestedMovie.replace(/\s+/g, '');
let requestedMovieStripped = encodeURI(requestedMovie);

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
            if (i !== 0) {  //Empty review {} at beginning
                console.log("Review: " + JSON.stringify(review));
                let tableRow = $("<tr></tr>").appendTo("#table-body");
                
                let userCol = $("<td></td>").appendTo(tableRow);
                let userLink = $("<a></a>").attr("href", "/users/" + encodeURI(review.username)).text(review.username).appendTo(userCol);
                
                let ratingCol = $("<td></td>").text(review.basicRating).appendTo(tableRow);
                
                let fullReview = $("<td></td>").text(review.fullReview).appendTo(tableRow);
            }
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