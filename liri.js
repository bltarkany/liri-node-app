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

// switching between arguments
function infoSwitch(commands, search) {
    switch (commands) {
        case "concert-this":
            bands(search);
            break;
        case "spotify-this-song":
            songs(search);
            break;
        case "movie-this":
            movies(search);
            break;
        case "do-what-it-says":
            random();
            break;
        default:
            console.log("LIRI did not understand. Try again.");
    };
}


// bands in town function for retrieving info
function bands(artists) {
    var artists = search;
    // console.log(artists);
    axios.get("https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp")
        .then(

            function (response) {
                // console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    console.log("\n" + artists);
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
    search = a.slice(3).join("+");
    var songTitle;

    if (!search) {
        songTitle = "The+Sign";
    } else {
        songTitle = search;
    }
    // console.log(songTitle);

    // constructor
    var spotify = new Spotify(keys.spotify);

    spotify
        .request('https://api.spotify.com/v1/search?q=' + songTitle + '&type=track&market=us&limit=10')
        .then(function (data) {
            // console.log(data);
            // console.log(data.tracks.items[0]);
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log(i);
                console.log("---------");
                console.log("Artist(s): " + data.tracks.items[i].artists[0].name + "\nSong Title: " + data.tracks.items[i].name + "\nAlbum: " + data.tracks.items[i].album.name + "\nPreview Link: " + data.tracks.items[i].preview_url + "\n---------\n");
            }
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });

};

// OMDB info retrieval and display
function movies(title) {
    search = a.slice(3).join("+");
    var title;

    if (!search) {
        title = "Mr Nobody";
    } else {
        title = search;
    }

    // console.log(title);

    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=" + title + "&plot=short&limit=4")
        .then(
            function (response) {
                // console.log(response.data);

                console.log("\nTitle: " + response.data.Title);
                console.log("--------------\n");
                console.log("Year Released: " + response.data.Year + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes: " + response.data.Ratings[1].Value + "\nProduced in: " + response.data.Country + "\nLanguages: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n");
            }
        )
};


function random() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        console.log(data);

        var arr = data.split(",");
        console.log(arr);

    })
};

infoSwitch(commands, search);