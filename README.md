# LIRI-Bot

LIRI Bot is a CLI Node App providing the an entertainment search service in one simplified loaction. LIRI will provide the search service by utilizing Spotify for music, Bands in Town for concerts and OMDB for movies.

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
* Creating multiple command options with the function `switch`, that may be called through the command line utilizing `node`
* `export` sensitive infomation using the `.env` file, keeping the information private by way of DotEnv and `.gitignore`
* Pulling pre-popualted infomation to run using `fs.readFile` from the `random.txt` file


### Using LIRI Bot

1. Begin by `npm install` all necessary packages
2. Create a `SPOTIFY_ID` and `SPOTIFY_SECRET` both of which can be added to keys.js using the node-spotify-api synatax
    * (https://developer.spotify.com/documentation/web-api/quick-start/)
    * follow the link to set up your account and ids 
3. From the command line run: 
    * To search Bands in Town for concerts:
        ```node
        node liri.js concert-this <artist/band name>
        ```
    * To search OMDB for movies:
        ```node
        node liri.js movie-this <movie title>
        ```
    * To search Spotify for songs:
        ```node
        node liri.js spotify-this-song <song title>
        ```
    * To search info on random.txt:
        ```node
        node liri.js do-what-it-says
        ```

### Creating your own LIRI-Bot 

[GitHub Repository](https://github.com/bltarkany/liri-node-app)

#### demo
![gamedemo](https://github.com/bltarkany/liri-node-app/blob/master/images/gamepic.png)

#### Instructions