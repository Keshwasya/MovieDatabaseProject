const urlParams = new URLSearchParams(window.location.search);
const requestedPerson = urlParams.get("personName");
let decodedPerson = decodeURIComponent(requestedPerson);

console.log(decodedPerson);

let result = {roles: [], movieTitles: []};

$.getJSON('/js/movie-data-short.json', function(data) { 
    let rowCount = 0;
    
    $.each(data, function(i, movie) { //Loop through movie database
        let decodedTitle = movie.Title.replace(/\s+/g, '');
        let strippedDirector;
        let strippedWriter;
        let strippedActor;
        
        //Look through actor, loop through writers (startsWith), and then actors
        if (movie.Director.toLowerCase().startsWith(decodedPerson.toLowerCase())) {
            //Do stuff
            addPersonInformation("Director", movie.Title, result);
            /*if (!(result.roles.includes("Director"))) {
                result.roles.push("Director");
            }*/
        }
        
        let writerArray = movie.Writer.replace(/ *\([^)]*\) */g, " ").split(",");
        for (let j = 0; j < writerArray.length; j++) {
            if (writerArray[j].toLowerCase().startsWith(decodedPerson.toLowerCase())) {
                //if (!(result.movieTitles.includes()))
                addPersonInformation("Writer", movie.Title, result);
            }
        }
            
        let actorsArray = movie.Actors.replace(/ *\([^)]*\) */g, " ").split(",");
        for (let j = 0; j < actorsArray.length; j++) {
            if (actorsArray[j].toLowerCase().startsWith(decodedPerson.toLowerCase())) {
                addPersonInformation("Actor", movie.Title, result);
            }
        }

    });
    
    $("#person-name").text(decodedPerson);
    $("#roles").text(result.roles.toString());
    $("#movies").text(result.movieTitles.toString());
});
    
function addPersonInformation(role, movieTitle, result) {
    
    if (!(result.roles.includes(role))) { //If role isn't already added, add it
        result.roles.push(role);
        console.log("Role: " + role);
    }
    
    if (!(result.movieTitles.includes(movieTitle))) {
        result.movieTitles.push(movieTitle);
        console.log("Featured in: " + movieTitle);
    }
}