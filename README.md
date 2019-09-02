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
        ```js
        node liri.js concert-this <artist/band name>
        ```
        ![bandsvideo](https://github.com/bltarkany/liri-node-app/blob/master/images/concert.mp4)

    * To search OMDB for movies:
        ```js
        node liri.js movie-this <movie title>
        ```
        ![movievideo](https://github.com/bltarkany/liri-node-app/blob/master/images/movie.mp4)

    * To search Spotify for songs:
        ```js
        node liri.js spotify-this-song <song title>
        ```
        ![spotifyvideo](https://github.com/bltarkany/liri-node-app/blob/master/images/movie.mp4)

    * To search info on random.txt:
        ```js
        node liri.js do-what-it-says
        ```
        ![dowhatvideo](https://github.com/bltarkany/liri-node-app/blob/master/images/dowhat.mp4)

### Creating your own LIRI-Bot 

[GitHub Repository](https://github.com/bltarkany/liri-node-app)

#### demo
![gamedemo](https://github.com/bltarkany/liri-node-app/blob/master/images/gamepic.png)

#### Instructions

1. Navigate to the root of your project and run `npm init -y` &mdash; this will initialize a `package.json` file for your project. The `package.json` file is required for installing third party npm packages and saving their version numbers. If you fail to initialize a `package.json` file, it will be troublesome, and at times almost impossible for anyone else to run your code after cloning your project.

2. Make a `.gitignore` file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.

```
node_modules
.DS_Store
.env
```

3. To retrieve the data that will power this app, you'll need to send requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your app.

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

     * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)

   * Create a `SPOTIFY_ID` and `SPOTIFY_SECRET` both of which can be added to keys.js using the node-spotify-api synatax
        * (https://developer.spotify.com/documentation/web-api/quick-start/)
        * follow the link to set up your account and ids


4. Make a JavaScript file named `keys.js`.

* Inside keys.js your file will look like this:

```js
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```

5. Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

* This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.

* If someone wanted to clone your app from github and run it themselves, they would need to supply their own `.env` file for it to work.

6. Make a file called `random.txt`.

   * Inside of `random.txt` put the following in with no extra characters or white space:

     * spotify-this-song,"I Want it That Way"

7. Make a JavaScript file named `liri.js`.

8. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:

```js
require("dotenv").config();
```

9. Add the code required to import the `keys.js` file and store it in a variable.

```js
  var keys = require("./keys.js");
```
  
* You should then be able to access your keys information like so

  ```js
  var spotify = new Spotify(keys.spotify);
  ```

10. Make it so liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

##### What Each Command Should Do

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.

   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.


3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

   * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * Edit the text in random.txt to test out the feature for movie-this and concert-this.

#### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* Make sure you append each command you run to the `log.txt` file. 

* Do not overwrite your file each time you run a command.
