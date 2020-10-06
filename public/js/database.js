'use strict';

$.getJSON('/database/movie-data-short.json', function(data) { 
    let rowCount = 0;
    
    $.each(movieDatabase, function(i, movie) { //Loop through movie database
    let row;
    let column;
    let image;
    
    if (rowCount < 3) {
        row = $(".container-fluid .row").last();
        
        rowCount++;
    } else {
        row = jQuery("<div>").addClass("row").appendTo();
        
        rowCount = 0;
    }
    
    column = jQuery("<div>").addClass("col-sm").appendTo(row);
    image = $("<img />", {
        src: movie.Poster,
        alt: movie.Title
    }).appendTo(column);
});
};

//let movieDatabase = JSON.parse();

//console.log(movieDatabase);

//console.log(movieDatabase);

//Add movies dynamically
//let rowCount = 0;

/*for (var movie in movieDatabase) {
    let row;
    let column;
    let image;
    
    if (rowCount < 3) {
        row = $(".container-fluid .row").last();
        
        rowCount++;
    } else {
        row = jQuery("<div>").addClass("row").appendTo();
        
        rowCount = 0;
    }
    
    column = jQuery("<div>").addClass("col-sm").appendTo(row);
    image = $("<img />", {
        src: movie.Poster,
        alt: movie.Title
    }).appendTo(column);
    
    console.log(movie);
}*/

/*$.each(movieDatabase, function(i, movie) { //Loop through movie database
  let row;
    let column;
    let image;
    
    if (rowCount < 3) {
        row = $(".container-fluid .row").last();
        
        rowCount++;
    } else {
        row = jQuery("<div>").addClass("row").appendTo();
        
        rowCount = 0;
    }
    
    column = jQuery("<div>").addClass("col-sm").appendTo(row);
    image = $("<img />", {
        src: movie.Poster,
        alt: movie.Title
    }).appendTo(column);
});*/