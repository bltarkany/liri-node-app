# LIRI-Bot

LIRI Bot is a CLI App providing the an entertainment search service in one simplified loaction. LIRI will provide the search service by utilizing Spotify for music, Bands in Town for concerts and OMDB for movies.

### Overview

* Utilizing multiple npm packages to assit in running API calls and `moment.js`. Packages inculde:
    * Node-spotify-api
    * Axios
    * Moment
    * DotEnv
    * FS
* API pulls from the following:
    * Bandsintown.com using Axios
        * reformatting infomation with Moment package
    * OMDB using Axios
    * Spotify using Node-sopfity-api
* Creating multiple command options with the function `switch`, that may be called through the command line
* `export` sensitive infomation using the `.env` file, keeping the information private by way of DotEnv and `.gitignore`
* Pulling pre-popualted infomation to run using `fs.readFile`