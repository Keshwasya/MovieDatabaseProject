'use strict';

$.getJSON('/js/movie-data-short.json', function(data) { 
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
        strippedTitle = strippedTitle.replace(/\s+/g, '');  //Removes spaces
        link = $("<a>", {
            href: "/html/moviePage.html?movie=" + strippedTitle
        }).appendTo(column);
        image = $("<img />", {
            src: movie.Poster,
            alt: movie.Title
        }).appendTo(link);
    });
});