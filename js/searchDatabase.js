'use strict';

function init(){ //displays all movies in database when page loads  
    $.getJSON('/database/movie-data-short.json', function(data) { 
        let rowCount = 0;
        
        $.each(data, function(i, movie) { //Loop through movie database
            let row;
            let column;
            let link;
            let image;
            let strippedTitle;

            if (rowCount < 3) {
                row = $(".container-fluid .row").last();

                rowCount++;
            } else {
                row = jQuery("<div>").addClass("row").appendTo();
                row = $(".container-fluid .row").last();
                rowCount = 0;
            }

        
            column = jQuery("<div>").addClass("col-sm").appendTo(row);
            strippedTitle = movie.Title;
            strippedTitle = strippedTitle.replace(/\s+/g, '');  
            link = $("<a>", {
                href: "/html/moviePage.html?movie=" + strippedTitle
            }).appendTo(column);
            image = $("<img />", {
                src: movie.Poster,
                alt: movie.Title
            }).appendTo(link);
        });
    });
}

let req = null;
let box = document.getElementById("searchBar");
box.oninput = getMovies;

function getMovies(){
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let div = document.getElementById("moviePosters");
            div.innerHTML = "";
            let result = JSON.parse(this.responseText);
            if(result.movies.length == 0){
                let text = '<h5 style="text-align: center;">Sorry no matches to search.  ¯\\_(ツ)_/¯<br><br><br><br><br><br></h5>';

                document.getElementById("noMatch").innerHTML = text;
            }else{
                document.getElementById("noMatch").innerHTML = "";
            }            

            let rowCount = 0;
            for(let x=0;x<result.movies.length;x++){
                console.log(result.movies[x]);

                let row;
                let column;
                let link;
                let image;
                let strippedTitle;

                if (rowCount < 3) {
                    row = $(".container-fluid .row").last();

                    rowCount++;
                } else {
                    row = jQuery("<div>").addClass("row").appendTo();
                    row = $(".container-fluid .row").last();

                    rowCount = 0;
                }

                column = jQuery("<div>").addClass("col-sm").appendTo(row);
                strippedTitle = result.movies[x].Title;
                strippedTitle = strippedTitle.replace(/\s+/g, '');  //Removes spaces
                link = $("<a>", {
                    href: "/html/moviePage.html?movie=" + strippedTitle
                }).appendTo(column);
                image = $("<img />", {
                    src: result.movies[x].Poster,
                    alt: result.movies[x].Title,
                    id: result.movies[x].Title
                }).appendTo(link);
            }            
        }
    }

    //Making a GET request to a server on the local computer
    //The resource requests is /movie
    //A query string is included specifying the search query
    req.open("GET", `http://localhost:3000/movies?chars=${box.value}`);
    req.send();
}






//JQuery way of doing it.

// function searchBar(){

//     $("#test").empty(); //gets rid of old searchs
    
//     $.getJSON('/database/movie-data-short.json', function(data) { 
//         let rowCount = 0;
        
//         $.each(data, function(i, movie) { //Loop through movie database
//             if(movie.Title.toLowerCase().startsWith(document.getElementById("searchBar").value)){
//                 console.log(movie.Title);

//                 let row;
//                 let column;
//                 let link;
//                 let image;

//                 if (rowCount < 3) {
//                     row = $(".container-fluid .row").last();

//                     rowCount++;
//                 } else {
//                     row = jQuery("<div>").addClass("row").appendTo();

//                     rowCount = 0;
//                 }

//                 column = jQuery("<div>").addClass("col-sm").appendTo(row);
//                 link = $("<a>", {
//                     href: ""
//                 }).appendTo(column);
//                 image = $("<img />", {
//                     src: movie.Poster,
//                     alt: movie.Title
//                 }).appendTo(link);
//             }           
//         });
//     });
// }