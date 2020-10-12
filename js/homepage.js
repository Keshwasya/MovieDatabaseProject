'use strict';

$.getJSON('/database/movie-data-short.json', function(data) { 
    let rowCount = 0;
    
    $.each(data, function(i, movie) { //Loop through movie database
        let row;
        let column;
        let link;
        let image;

        if (rowCount < 3) {
            row = $(".container-fluid .row").last();

            rowCount++;
        } else {
            row = jQuery("<div>").addClass("row").appendTo();
            row = $(".container-fluid .row").last();
            rowCount = 0;
        }

        column = jQuery("<div>").addClass("col-sm").appendTo(row);
        link = $("<a>", {
            href: ""
        }).appendTo(column);
        image = $("<img />", {
            src: movie.Poster,
            alt: movie.Title
        }).appendTo(link);
    });
});