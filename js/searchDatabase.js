'use strict';

let req = new XMLHttpRequest();
let page = 1;
let more = document.getElementById("moreBtn")


function loadMore(){
    page++;
    //window.location.reload();
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let div = document.getElementById("moviePosters");
            div.innerHTML = "";
            let result = JSON.parse(this.responseText);
            if(result.length == 0){
                let text = '<h5 style="text-align: center;">Sorry no movies in Database.  ¯\\_(ツ)_/¯<br><br><br><br><br><br></h5>';
    
                document.getElementById("noMatch").innerHTML = text;
            }else{
                document.getElementById("noMatch").innerHTML = "";
            }            
    
            let rowCount = 0;
            for(let x=0;x< page*9;x++){
                //console.log(result[x]);
            
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
                strippedTitle = result[x].Title;
                //strippedTitle = strippedTitle.replace(/\s+/g, '');  //Removes spaces
                link = $("<a>", {
                    href: "/html/moviePage.html?movie=" + strippedTitle
                }).appendTo(column);
                image = $("<img />", {
                    src: result[x].Poster,
                    alt: result[x].Title,
                    id: result[x].Title
                }).appendTo(link);
            }            
        }
    }
    
    req.open("GET", `http://localhost:3000/movies/search?chars=${""}`);
    req.send();
}

req = new XMLHttpRequest();
req.onreadystatechange = function() {
    if(this.readyState==4 && this.status==200){
        let div = document.getElementById("moviePosters");
        div.innerHTML = "";
        let result = JSON.parse(this.responseText);
        
        if(result.length == 0){
            let text = '<h5 style="text-align: center;">Sorry no movies in Database.  ¯\\_(ツ)_/¯<br><br><br><br><br><br></h5>';

            document.getElementById("noMatch").innerHTML = text;
        }else{
            document.getElementById("noMatch").innerHTML = "";
        }            

        let rowCount = 0;
        for(let x=0;x< page*9;x++){
            console.log(result[x]);
        
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
            strippedTitle = result[x].Title;
            //strippedTitle = strippedTitle.replace(/\s+/g, '');  //Removes spaces
            link = $("<a>", {
                href: "/html/moviePage.html?movie=" + strippedTitle
            }).appendTo(column);
            image = $("<img />", {
                src: result[x].Poster,
                alt: result[x].Title,
                id: result[x].Title
            }).appendTo(link);
        }            
    }
}

req.open("GET", `http://localhost:3000/movies/search?chars=${""}`); //gets all movies
req.send();
    


let box = document.getElementById("searchBar");
let btn = document.getElementById("enter");
btn.onclick = getMovies;
//box.oninput = getMovies;


function getMovies(){
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let div = document.getElementById("moviePosters");
            div.innerHTML = "";
            let result = JSON.parse(this.responseText);
            more.style.display = "none";    
            if(result.length == 0){
                let text = '<h5 style="text-align: center;">Sorry no matches to search.  ¯\\_(ツ)_/¯<br><br><br><br><br><br></h5>';

                document.getElementById("noMatch").innerHTML = text;
            }else{
                document.getElementById("noMatch").innerHTML = "";
            }            

            let rowCount = 0;
            for(let x=0;x<result.length;x++){
                //console.log(result[x]);

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
                strippedTitle = result[x].Title;
                //strippedTitle = strippedTitle.replace(/\s+/g, '');  //Removes spaces
                link = $("<a>", {
                    href: "/html/moviePage.html?movie=" + strippedTitle
                }).appendTo(column);
                image = $("<img />", {
                    src: result[x].Poster,
                    alt: result[x].Title,
                    id: result[x].Title
                }).appendTo(link);
            }            
        }
    }
    
    //Making a GET request to a server on the local computer
    //The resource requests is /movie
    //A query string is included specifying the search query
    //req.open("GET", `http://localhost:3000/movies?chars=${box.value}`);
    req.open("GET", `http://localhost:3000/movies/search?chars=${box.value}`);
    req.send();
}

function getGenre(genre){

    $("#moviePosters").empty(); //clears old posters
    $("#noMatch").empty(); //clears old no match message if it exists

    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let result = JSON.parse(this.responseText);
            more.style.display = "none";  
            if(result){  //if there are movies in that genre
                let rowCount = 0;
            for(let x=0;x<result.length;x++){
                //console.log(result[x]);

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
                strippedTitle = result[x].Title;
                //strippedTitle = strippedTitle.replace(/\s+/g, '');  //Removes spaces
                link = $("<a>", {
                    href: "/html/moviePage.html?movie=" + strippedTitle
                }).appendTo(column);
                image = $("<img />", {
                    src: result[x].Poster,
                    alt: result[x].Title,
                    id: result[x].Title
                }).appendTo(link);
                } 
            }else{ //if no movies in this genre
                let div = document.getElementById("moviePosters");
                div.innerHTML = "";  
                let text = '<h5 style="text-align: center;">Sorry no matches for this genre.  ¯\\_(ツ)_/¯<br><br><br><br><br><br></h5>';
                document.getElementById("noMatch").innerHTML = text;
            }
                 
            

                       
        }
    }
    req.open("GET", `http://localhost:3000/movies/genre/${genre}`);
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