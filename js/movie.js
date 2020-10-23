const urlParams = new URLSearchParams(window.location.search);
const requestedMovie = urlParams.get("movie");
let requestedMovieStripped = requestedMovie.replace(/\s+/g, '');

console.log(requestedMovieStripped);

$.getJSON('/database/movie-data-short.json', function(data) { 
    let rowCount = 0;
    
    $.each(data, function(i, movie) { //Loop through movie database
        let strippedTitle = movie.Title;
        console.log("Stripped: " + strippedTitle);
        
        if (requestedMovieStripped === strippedTitle) {
            $("#title").text(movie.Title);
            $("#release").text(movie.Year);
            $("#rating").text(movie.Ratings[0].Value); //IMDB rating
            $("#time").text(movie.Runtime);
            $("#genre").text(movie.Genre);
            $("#director").text(movie.Director);
            $("#writers").text(movie.Writer);
            $("#actors").text(movie.Actors);
            
            $("#summary").text(movie.Plot);
            
            $("#poster").attr("src", movie.Poster);
        }
    });
});