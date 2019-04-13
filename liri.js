require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var moment = require('moment');

var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');

inquirer.prompt(
    [{
        type: "list",
        message: "What type of command would you like to run?",
        choices: ["concert search", "song search", "movie search", "do-what-it-says"],
        name: "choice"
    }]
).then(function (res, err) {

    switch (res.choice) {
        case "concert search":
            inquirer.prompt([{
                type: "input",
                message: "What concert are you looking for?",
                name: "search"
            }]).then(function (res, err) {
                concertSearch(res.search);
            });
            break;

        case "song search":
            inquirer.prompt([{
                type: "input",
                message: "What song are you looking for?",
                name: "search"
            }]).then(function (res, err) {
                songSearch(res.search);
            });
            break;

        case "movie search":

            inquirer.prompt([{
                type: "input",
                message: "What movie are you looking for?",
                name: "search"
            }]).then(function (res, err) {
                movieSearch(res.search);
            });

            break;

        case "do-what-it-says":

            break;

        default:
            break;
    }
});

function searchContent(message) {

    inquirer.prompt([{
        type: "input",
        message: message,
        name: "search"
    }]).then(function (res, err) {
        return res.search;
    });
}

function concertSearch(band) {

    var queryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=" + keys.bands;
    axios.get(queryURL)
        .then(function (res) {
            var i = 0;
            console.log("Next venue: " + res.data[i].venue.name);
            var dateArr = res.data[i].datetime;
            var split = dateArr.split("T");
            var time = split.pop();
            var date = split[0];
            console.log("Date: " + moment(date).format("MMMM Do YYYY"));
            console.log("Time: " + time + " UTC");
        });
    // todo give the next venue option
    // .then(
    //     inquirer.prompt([{
    //         message: "Would you like to find the next result?",
    //         type: "confirm",
    //         name: "next"
    //     }])
    //     .then(function (res) {
    //     if (res==="Yes") {
    //         i++;
    //         console.log("Next venue: " + JSON.stringify(res.data[i].venue.name));
    //         console.log("Date and Time: " + res.data[i].datetime);
    //     }
    // }));

}

function songSearch(song) {




    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        if (data === undefined) {
            console.log("Enjoy this song instead!");
            console.log("Song Name: The Sign");
            console.log("Artist: Ace of Base");
            console.log("Spotify Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE?si=g60WDgEaSCufJj-wdUslRw");
        } else {
            var song = data.tracks.items[0];
            var artists = "";
            console.log(JSON.stringify(data.tracks.items[0], null, 2));
            for (let i = 0; i < song.artists.length; i++) {
                artists += song.artists[i].name + ", ";
            }
            console.log("Artist(s): " + artists);

            console.log("Song Name: " + song.name);
            console.log("Album Name: " + song.album.name);
            console.log("Spotify Link: " + song.preview_url);
        }
    });


    //    * If no song is provided then your program will default to "The Sign" by Ace of Base.
}

function movieSearch(movie) {
    //     * This will output the following information to your terminal/bash window:

    //     ```
    //       * Title of the movie.
    //       * Year the movie came out.
    //       * IMDB Rating of the movie.
    //       * Rotten Tomatoes Rating of the movie.
    //       * Country where the movie was produced.
    //       * Language of the movie.
    //       * Plot of the movie.
    //       * Actors in the movie.
    //     ```

    //   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    //     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

    //     * It's on Netflix!

    //   * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
}

function doThis(doit) {
    // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    // * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

    // * Edit the text in random.txt to test out the feature for movie-this and concert-this.
}

//* ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.