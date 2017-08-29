'use strict';

// write the code you need to grab the data from keys.js. Then store the keys in a variable.

var keys = require('./keys.js');


// fs is a core Node package for reading and writing files
var fs = require("fs");


var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

// Store all of the arguments in an array
var nodeArgs = process.argv;



// Make it so that this file can take in one of the following commands: my-tweets / spotify-this-song / movie-this / do-what-it-says

/* What Each Command Should Do


1. node liri.js my-tweets

	This will show your last 20 tweets and when they were created at in your terminal/bash window.
*/
function show20Tweets(){
  console.log("I'm showing my tweets");
}

function showSongInfo(songName){
  // console.log("I'm showing song information for " + songName);
  
  var spotify = new Spotify(keys.spotifyKeys);

    if(!songName) {
      //  songName = "The Sign"
      spotify
        .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
        .then(function(data) {
          console.log(data.artists[0].name);
          console.log(data.name);
          console.log(data.preview_url);
          console.log(data.album.name); 
        })
        .catch(function(err) {
          console.error('Error occurred: ' + err); 
        });
    } else {
   
      spotify.search({ type: 'track', query: songName, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        // this just gives me more info than I need
        console.log(JSON.stringify(data)); 

      

        for(var i=0; i<data.tracks.items[0].artists.length; i++) {
          console.log(data.tracks.items[0].artists[i].name);
        ;}

        console.log(data.tracks.items[0].name);

        console.log(data.tracks.items[0].preview_url);

        console.log(data.tracks.items[0].album.name);
      });
    }
}

function showMovieInfo(movieName){
  console.log("I'm showing movie information for " + movieName);
}

function doWhatItSays(command, args){
  if (command === 'my-tweets'){
    show20Tweets();
  } else if (command === 'spotify-this-song') {
    showSongInfo(args);
  } else if (command === 'movie-this') {
    showMovieInfo(args);
  } else {
    console.log('this is an error');
  }
}

if(nodeArgs[2] === 'do-what-it-says') {

} else {
  doWhatItSays(nodeArgs[2], nodeArgs[3]);
}

/*
2. node liri.js spotify-this-song '<song name here>'

	This will show the following information about the song in your terminal/bash window
		Artist(s)
		The song's name
		A preview link of the song from Spotify The album that the song is from

	if no song is provided then your program will default to "The Sign" by Ace of Base



3. node liri.js movie-this '<movie name here>'

	This will output the following information to your terminal/bash window:
		* Title of the movie.
		* Year the movie came out.
		* IMDB Rating of the movie.
		* Country where the movie was produced. * Language of the movie.
		* Plot of the movie.
		* Actors in the movie.
		* Rotten Tomatoes URL.

	If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
		If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/ 
		It's on Netflix!
*/

/*
// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Release Year: " + JSON.parse(body).Year);
  }
});
*/
/*
4. node liri.js do-what-it-says
	Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands
		It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt .
		Feel free to change the text in that document to test out the feature for other commands
*/
// This block of code will read from the "random.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"


/* fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);
  console.log(typeof data);
  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);
  console.log(typeof dataArr);
  console.log(dataArr.length);


});
*/

/*

BONUS
	In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt . Make sure you append each command you run to the log.txt file.
	
	Do not overwrite your file each time you run a command. */

// Core node package for reading and writing files
/* var fs = require("fs");

// This block of code will create a file called "movies.txt".
// It will then print "Inception, Die Hard" in the file
fs.writeFile("log.txt", "Spider Man, Finding Nemo, Frozen, Die Hard 2", function(err) {
appendFile??
  // If the code experiences any errors it will log the error to the console.
  if (err) {
    return console.log(err);
  }

  // Otherwise, it will print: "log.txt was updated!"
  console.log("log.txt was updated!");

});


++++++++++++++++++++
// We then store the textfile filename given to us from the command line
var textFile = process.argv[2];

// We then append the contents "Hello Kitty" into the file
// If the file didn't exist then it gets created on the fly.
fs.appendFile(textFile, "Game of Thrones. Keropie. Bran is weird.", function(err) {

  // If an error was experienced we say it.
  if (err) {
    console.log(err);
  }

  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  else {
    console.log("Content Added!");
  }

});

*/



