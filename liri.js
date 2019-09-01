// npm dotenv package call
require("dotenv").config();
// fs package call
var fs = require("fs");

// axios package call
var axios = require("axios");
// moment package call
var moment = require("moment");

// keys.js call
var keys = require("./keys.js");
// spotify package call
var Spotify = require('node-spotify-api');

// constructor
var spotify = new Spotify(keys.spotify);


// global process.argv variables
var a = process.argv;
var commands = a[2];
var search = a.slice(3).join("");

if (!commands) {
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
    axios.get("https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp")
        .then(

            function (response) {
                // console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    console.log(artists);
                    console.log("----------");
                    console.log("Venue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\nDate of event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n");

                }
            },

            function (error) {
                if (error.response) {
                    console.log(error.response.data);
                }
            }
        )
};

// spotify function for retriveing info
function songs(songTitle) {
    var songTitle;

    if (!search) {
        songTitle = "The Sign";
    } else {
        songTitle = search;
    }

    console.log(songTitle);

    spotify
        .search({
            type: 'track',
            query: songTitle,
            limit: 20
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (err) {
            console.log(err);
        });

};

// OMDB info retrieval and display
function movies(title) {
    search = a.slice(3).join("+");
    var title;
    
    if(!search) {
        title = "Mr Nobody";
    } else{
        title = search;
    }

    console.log(title);

    axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + title + "&plot=short&limit=4")
    .then(
        function(response) {
            // console.log(response.data);

            console.log("Title: " + response.data.Title);
            console.log("--------------\n");
            console.log("Year Released: " + response.data.Year + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes: " + response.data.Ratings[1].Value + "\nProduced in: " + response.data.Country + "\nLanguages: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n");
        }
    )
};