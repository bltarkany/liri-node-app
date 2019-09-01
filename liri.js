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
// var a = process.argv;
var commands = process.argv[2];
var search = process.argv.slice(3).join("+");


// run the input arguments
function runInfo(arg1, arg2) {
    infoSwitch(arg1, arg2);
};

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
function bands(search) {
    // console.log(search);
    
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
        .then(
            function (response) {
                
                // console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    console.log("\n" + search);
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
function songs(search) {

    if (!search) {
        search = "The+Sign";
    } 
    // console.log(search);

    // constructor
    var spotify = new Spotify(keys.spotify);

    spotify
        .request('https://api.spotify.com/v1/search?q=' + search + '&type=track&market=us&limit=10')
        .then(function (data) {

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
function movies(search) {

    if (!search) {
        search = "Mr Nobody";
    }

    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=" + search + "&plot=short&limit=4")
        .then(
            function (response) {

                console.log("\nTitle: " + response.data.Title);
                console.log("--------------\n");
                console.log("Year Released: " + response.data.Year + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes: " + response.data.Ratings[1].Value + "\nProduced in: " + response.data.Country + "\nLanguages: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n");
            }
        )
};

// do what it says readfile command and argument
function random() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        console.log(data);

        var arr = data.split(",");
        console.log(arr);
        if(arr.length == 2){
            runInfo(arr[0], arr[1])
        } else if(arr.length == [1]){
            runInfo(arr[0])
        }; 

    })
};

runInfo(commands, search);