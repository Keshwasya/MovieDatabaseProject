'use strict';

let req = null;


let btn = document.getElementById("submit");
btn.onclick = addMovies;

function addMovies(){
    let Title = document.getElementById("Title").value;
    let Year = document.getElementById("Year").value;
    let Rated = document.getElementById("Rated").value;
    let imdbRating = document.getElementById("imdbRating").value;
    let Runtime = document.getElementById("Runtime").value;
    let Poster = document.getElementById("Poster").value;
    let Director = document.getElementById("Director").value;
    let Actors = document.getElementById("Actors").value;
    let Language = document.getElementById("Language").value;
    let Writer = document.getElementById("Writer").value;
    let Genre = document.getElementById("Genre").value;
    let DVD = document.getElementById("DVD").value;
    let Country = document.getElementById("Country").value;
    let Plot = document.getElementById("Plot").value;
    if(Title == ""){
        alert("No Title entered");
        return false;
    }

    req = new XMLHttpRequest();
    req.open("POST", `http://localhost:3000/movies?Title=${Title}&Year=${Year}&Rated=${Rated}&imdbRating=${imdbRating}&Runtime=${Runtime}&Poster=${Poster}&Director=${Director}&Actors=${Actors}&Language=${Language}&Writer=${Writer}&Genre=${Genre}&DVD=${DVD}&Country=${Country}&Plot=${Plot}`);
    req.send();
    

    return true;
}