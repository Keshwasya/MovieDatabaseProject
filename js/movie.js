const urlParams = new URLSearchParams(window.location.search);
const requestedMovie = urlParams.get("movie");
let requestedMovieStripped = requestedMovie.replace(/\s+/g, '');

console.log(requestedMovieStripped);

$.getJSON('/js/movie-data-short.json', function(data) { 
    let rowCount = 0;
    
    $.each(data, function(i, movie) { //Loop through movie database
        let strippedTitle = movie.Title.replace(/\s+/g, '');
        let strippedDirector;
        let strippedWriter;
        let strippedActor;
        
        if (requestedMovieStripped === strippedTitle) {
            $("#title").text(movie.Title);
            $("#release").text(movie.Year);
            //$("#rating").text(movie.Ratings[0].Value); //IMDB rating
            $("#rating").text(movie.imdbRating); //IMDB rating
            $("#time").text(movie.Runtime);
            $("#genre").text(movie.Genre);
            
            //$("#director").text(movie.Director);
            
            $("<a>", {
                text: movie.Director,
                href: encodeURI("/people/" + movie.Director) //Removes spaces
            }).appendTo("#director");
            
            
            //$("#writers").text(movie.Writer);
            let writerArray = movie.Writer.replace(/ *\([^)]*\) */g, " ").split(",");
            console.log(writerArray);
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
        }
    });
});