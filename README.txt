1.# MovieDatabaseProject

2.# Keshwasya Singh and Danial Bala (partners)

3.## Run
~~~
cd MovieDatabaseProject
npm install
npm start
~~~

4.#A description of the files the TA should look at to evaluate your business logic code
homePage.html //this is our homepage where we have dynamically inserted movie posters. it the main page that links everything
moviePage.html //is where we will load whatever movie the user wants is is dynamically filled. This page supports multiple resources.
searchDatabase.html //the user can search the database. the page is updated using AJAX, clicking the poster will load that movie's movie page by passing in the object  
movieDatabase.js //is our server which handles all our get requests so far and loads our pages, it some of the logic to search movies
homepage.js //is the dynamic info which populates the homepage
searchDatabase.js  //using ajax, gets movies from the database based on user input
movie.js //dynamically filled the movie page based on the movie object being passed in 



5.## Behaviour
As of right now, the project uses web technologies such as Express, MongoDB, and jQuery. Further full-featured implementations will be provided later.

As for new behaviours we have added Ajax. 

As or right now, the main homePage.html has dynamic movie loading using Javascript that loads the JSON database file(for the finished website this page will only load a couple of movies from the full database, for now we are loading all movies from the movie-data-short.json that was provided, since there are only 10 movies in that database). This adds the movie's poster to the page, if clicked it will take the users to that movies individual page (moviePage.html)

The homePage.html has a button to take the user to the search page (searchDatabase.html) where initially all the movies are displayed. Based on the user input to the search bar the program will dynamically load the movies posters nicely on the page (the way Netflix does). the posters can be clicked to take the user to that movies specific page. Every-time the user inputs to the search bar the the program compares the input with the movie titles in the database, the search is done through using AJAX/http requests.

All of our HTML pages are linked. the homepage currently acts as the hub where all html pages are currently linked(expect the user and person pages).



We are using the Express and MongoDB NPM resources. npm install will install the required nom's for out project.

<<<<<<< HEAD
All required custom Javascript and CSS files are served statically by the Express server.
=======
All required custom Javascript and CSS files are served statically by the Express server.
>>>>>>> e8b7412e00bc5163f74019f6c1d6ce9c5b272e8c
