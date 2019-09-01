// npm dotenv package call
require("dotenv").config();
// fs package call
var fs = require("fs");
// spotify package call
var Spotify = require("node-spotify-api");
// axios package call
var axios = require("axios");
// moment package call
var moment = require("moment");
// keys.js call
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);


// global process.argv variables
var a = process.argv;
var commands = a[2];
var search = a.slice(3).join("");

if(!commands) {
    console.log("\nSorry that is an unrecognized command. Please try concert-this, spotify-this-song, movie-this or do-what-it-says.\n");    
};

switch (commands) {
    case "concert-this":
        bands();
        break;
    case "spotify-this-song":
        songs();
        break;
    case "movie-this":
        movies();
        break;
    case "do-what-it-says":
        songDefault();
        break;
};

// bands in town function for retrieving info
function bands(artists) {
    var artists = search;
    console.log(artists);
    axios.get("https://rest.bandsintown.com/artists/"+artists+"/events?app_id=codingbootcamp")
    .then(

        function(response) {
            // console.log(response.data);
            for (var i = 0; i < response.data.length; i++){
                console.log(artists);
                console.log("----------");
                console.log("Venue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\nDate of event: " + response.data[i].datetime + "\n");

            }
        },

        function(error) {
            if (error.response){
                console.log(error.response.data);
            }
        }
    )
};

// spotify function for retriveing info
function songs(songTitle) {
    var songTitle = search;
    

}
