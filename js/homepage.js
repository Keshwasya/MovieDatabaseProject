'use strict';

var decodedCookie = decodeURIComponent(document.cookie);
console.log(decodedCookie);

//console.log(window);

// function getCookie(name) {
//     // Split cookie string and get all individual name=value pairs in an array
//     var cookieArr = document.cookie.split(";");
    
//     // Loop through the array elements
//     for(var i = 0; i < cookieArr.length; i++) {
//         var cookiePair = cookieArr[i].split("=");
        
//         /* Removing whitespace at the beginning of the cookie name
//         and compare it with the given string */
//         if(name == cookiePair[0].trim()) {
//             // Decode the cookie value and return
//             return decodeURIComponent(cookiePair[1]);
//         }
//     }
// }
// console.log(getCookie("connect.sid"))

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
